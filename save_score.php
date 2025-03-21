<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$dsn = "mysql:host=localhost;dbname=game_db;charset=utf8";
$user = "root";
$pass = "3rtnCikH2}E@?T4";

try {
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["pseudo"], $data["email"], $data["score"])) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$pseudo = htmlspecialchars($data["pseudo"]);
$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
$score = intval($data["score"]);

if (!$email) {
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO scores (pseudo, score, email) VALUES (:pseudo, :score, :email)");
    $stmt->execute(["pseudo" => $pseudo, "email" => $email, "score" => $score]);
    echo json_encode(["success" => "Score saved successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
