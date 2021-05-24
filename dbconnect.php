<?php

include_once './config.example.php';

$link = mysqli_init();
$success = mysqli_real_connect(
   $link,
   $congig->host,
   $congig->user,
   $congig->password,
   $congig->db,
   $congig->port,
);

?>
