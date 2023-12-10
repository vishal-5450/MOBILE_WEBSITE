<?php
$username = $_POST['username'];
$phonenumber = $_POST['phonenumber'];
$email = $_POST['email'];
$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$conn = new mysqli('127.0.0.1:3306', 'root', '', 'mobile_website');

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection Failed: ' . $conn->connect_error]);
} else {
    $stmt = $conn->prepare("INSERT INTO registration(USERNAME, PHONENUMBER, EMAIL, PASSWORD) VALUES(?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $phonenumber, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Registration Successfully']);
    } else {
        echo json_encode(['error' => 'sqlError: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>