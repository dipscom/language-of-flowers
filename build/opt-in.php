<?php
$input = fopen('opt-in.csv', 'r');  //open for reading
$output = fopen('temporary.csv', 'w'); //open for writing
$new_row = true;
while( false !== ( $data = fgetcsv($input) ) ){  //read each line as an array

   //modify data here
   if ($data[1] == $_POST['email']) {
      //Replace line here
   		$new_row = false;
      $data[2] = $_POST['optin'];
   }
   //write modified data to new file
   fputcsv( $output, $data);
}

if($new_row) {
	fwrite($output, $_POST['email'] . ',' . $_POST['optin'] . ',' . date('r') . "\n");
}

//close both files
fclose( $input );
fclose( $output );

//clean up
unlink('opt-in.csv');// Delete obsolete BD
rename('temporary.csv', 'opt-in.csv');