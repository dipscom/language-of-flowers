import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

// Drives GSAP-based enter/appear/leave animations for a single "active child"
// slot (e.g. the routed page, or one column of the bouquet form), replacing
// react-addons-transition-group's componentWillAppear/Enter/Leave(callback)
// hooks. Page components expose the same animations as plain instance
// methods: animateAppear(done)/animateEnter(done)/animateLeave(done).
//
// Refs are kept per componentKey (not shared on the instance) because
// TransitionGroup renders the outgoing and incoming child concurrently while
// they overlap - see the hand-tuned delays throughout src/animation/*.
export default class AnimatedSwitch extends Component {
  constructor(props) {
    super(props);
    this.entries = new Map();
  }

  getEntry(key) {
    if (!this.entries.has(key)) {
      this.entries.set(key, {
        nodeRef: this.props.sharedNodeRef || React.createRef(),
        compRef: React.createRef(),
        phase: 'appear',
      });
    }
    return this.entries.get(key);
  }

  render() {
    const {
      componentKey,
      component: Child,
      wrapperClassName,
      wrapperId,
      sharedNodeRef,
      ...childProps
    } = this.props;
    if (!Child) return null;
    const entry = this.getEntry(componentKey);

    const transition = (
      <Transition
        key={componentKey}
        appear
        nodeRef={entry.nodeRef}
        onEnter={(isAppearing) => {
          entry.phase = isAppearing ? 'appear' : 'enter';
        }}
        onExit={() => {
          entry.phase = 'exit';
        }}
        onExited={() => {
          this.entries.delete(componentKey);
        }}
        addEndListener={(done) => {
          const api = entry.compRef.current;
          if (!api) {
            done();
            return;
          }
          if (entry.phase === 'appear' && api.animateAppear) api.animateAppear(done);
          else if (entry.phase === 'exit' && api.animateLeave) api.animateLeave(done);
          else if (api.animateEnter) api.animateEnter(done);
          else done();
        }}
      >
        {sharedNodeRef ? (
          <Child ref={entry.compRef} {...childProps} />
        ) : (
          <div ref={entry.nodeRef} id={wrapperId} className={wrapperClassName}>
            <Child ref={entry.compRef} {...childProps} />
          </div>
        )}
      </Transition>
    );

    return <TransitionGroup component={null}>{transition}</TransitionGroup>;
  }
}
