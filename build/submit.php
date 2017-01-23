<?php
$data = $_POST['data'];
$fh = fopen('responses.csv', 'a') or die("can't open file");
fwrite($fh, $data . ',' . date('r') . "\n");
fclose($fh);