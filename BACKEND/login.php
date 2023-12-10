<?php

$conn = new mysqli('127.0.0.1:3306', 'root', '', 'mobile_website');

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection Failed: ' . $conn->connect_error]);
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM registration WHERE EMAIL = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedHashedPassword = $row['PASSWORD'];
            
            if (password_verify($password, $storedHashedPassword)) {
                echo json_encode(['status' => "success"]);
            } else {
                echo json_encode(['status' => "error inside"]);
            }
        } else {
            echo json_encode("error outside");
        }
    } else {
        echo json_encode("error");
    }
}
?>