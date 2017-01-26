<?php
$data = $_POST['data'];
$fh = fopen('opt-in.csv', 'a') or die("can't open file");
fwrite($fh, $data . ',' . date('r') . "\n");
fclose($fh);





$input = fopen('opt-in.csv', 'r');  //open for reading
$output = fopen('temporary.csv', 'w'); //open for writing
while( false !== ( $data = fgetcsv($input) ) ){  //read each line as an array

   //modify data here
   if ($data[1] == $_POST['email']) {
      //Replace line here
      $data[2] = $_POST['optin'];
   } else {
   	fwrite($output, $_POST['email'] . ',' . $_POST['optin'] . ',' . date('r') . "\n");
   }

   //write modified data to new file
   fputcsv( $output, $data);
}

//close both files
fclose( $input );
fclose( $output );

//clean up
unlink('Database/opt-in.csv');// Delete obsolete BD
rename('Database/temporary.csv', 'Database/opt-in.csv');