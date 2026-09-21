import postcss from 'postcss';
import postcssImport from 'postcss-import';
import advancedVariables from 'postcss-advanced-variables';
import nested from 'postcss-nested';
import customMedia from 'postcss-custom-media';
import mediaMinmax from '@csstools/postcss-media-minmax';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';

// Sass-style @extend, as the old precss pipeline did it: the declarations of `@define-extend name { ... }`
// are emitted once, at the definition, for the combined selector list of every rule that uses
// `@extend name;`. Later rules therefore still override them (e.g. `.button { letter-spacing: 0 }`).
// Runs on exit so the selectors are already flattened by postcss-nested.
const extendHoist = () => ({
    postcssPlugin: 'extend-hoist',
    OnceExit(root) {
        const definitions = new Map();
        const users = new Map();
        root.walkAtRules('define-extend', at => definitions.set(at.params.trim(), at));
        root.walkAtRules('extend', at => {
            const name = at.params.trim();
            const rule = at.parent;
            if (!definitions.has(name)) throw at.error(`Unknown @define-extend "${name}"`);
            if (rule.type !== 'rule') throw at.error('@extend must be used directly inside a rule');
            if (!users.has(name)) users.set(name, new Set());
            rule.selectors.forEach(selector => users.get(name).add(selector));
            at.remove();
        });
        for (const [name, definition] of definitions) {
            const selectors = [...(users.get(name) || [])];
            if (selectors.length) {
                definition.replaceWith(postcss.rule({ selectors, nodes: definition.nodes.map(node => node.clone()) }));
            } else {
                definition.remove();
            }
        }
    }
});
extendHoist.postcss = true;

// Plugin order mirrors the old precss pipeline: variables, nesting and extends, then the rest.
export default {
    plugins: [
        postcssImport,
        advancedVariables,
        nested,
        extendHoist,
        customMedia,
        mediaMinmax,
        pxtorem({
            propList: ['*'],
            mediaQuery: true
        }),
        autoprefixer,
        sortMediaQueries({
            sort: 'mobile-first'
        })
    ]
};
