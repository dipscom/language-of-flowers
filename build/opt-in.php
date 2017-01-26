<?php
$data = $_POST['data'];
$fh = fopen('opt-in.csv', 'a') or die("can't open file");
fwrite($fh, $data . ',' . date('r') . "\n");
fclose($fh);