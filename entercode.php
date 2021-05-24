<?php

header('Content-Type: application/json');

require_once "dbconnect.php";

$query = mysqli_query($link, "SELECT * FROM countdown");
$row = mysqli_fetch_assoc($query);

$enddaterr = $row["end"];

$enddater = new DateTime($enddaterr);
$enddate = $enddater->format("Y-m-d H:i:s");
$currentDater = new DateTime("now");
$currentDate = $currentDater->format("Y-m-d H:i:s");

$secondsLeft = strtotime($enddate) - strtotime($currentDate);
$timeleft = round($secondsLeft / 60);

if ($timeleft <= 4) {
  $newDater = $currentDater->modify("+108 minutes");
  $newDate = $newDater->format("Y-m-d H:i:s");

  $secondsLeft = strtotime($newDate) - strtotime($currentDate);
  $timeleft = round($secondsLeft / 60);

  mysqli_query($link, "UPDATE countdown SET start='$currentDate', end='$newDate', alarm=0, ranout=0");

  $output = array("totalM" => $timeleft, "totalS" => $secondsLeft, "alarmon" => 0, "failed" => 0);
  echo json_encode($output, JSON_FORCE_OBJECT);
} else {
  $output = array("failed" => 1, "message" => "Not the time");
  echo json_encode($output, JSON_FORCE_OBJECT);
}

?>
