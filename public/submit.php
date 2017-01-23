<?php
$data = $_POST['data'];
$file = file_get_contents('responses.csv');
$file += $data . "\n";
file_put_contents('responses.csv', $data);