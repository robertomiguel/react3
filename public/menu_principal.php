<?php
$cookie_name = "react3";
$cookie_value = "algo raro y dificil de leer";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
header("access-control-allow-origin: "."http://$_SERVER[HTTP_HOST]".":3000");
header("access-control-allow-Credentials: true");
$sql = "
      SELECT *
        FROM menu_principal
    ORDER BY directorio desc, href, nombre
";

$mysqli = new mysqli('localhost','universal','universal','universal');
    $myArray = array();
    if ($result = $mysqli->query($sql)) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
        echo json_encode($myArray);
    }

    $result->close();
    $mysqli->close();
?>
