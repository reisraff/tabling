<?php

$data = json_decode(file_get_contents('php://input'), true);

$json = <<<JSON
[
    {
        "id" : 1,
        "name": "AdMotion Shop",
        "email": "AdMotion@gmail.com"
    },
    {
        "id" : 2,
        "name": "Add Banners",
        "email": "Add@gmail.com"
    },
    {
        "id" : 3,
        "name": "Kings",
        "email": "Kings@gmail.com"
    },
    {
        "id" : 4,
        "name": "Jones",
        "email": "Jones@gmail.com"
    },
    {
        "id" : 5,
        "name": "Baldmiu df d",
        "email": "Baldmiu@gmail.com"
    },
    {
        "id" : 6,
        "name": "Bob Marley",
        "email": "Bob@gmail.com"
    },
    {
        "id" : 7,
        "name": "José Gomes",
        "email": "José@gmail.com"
    },
    {
        "id" : 8,
        "name": "Alex Silva",
        "email": "Alex@gmail.com"
    },
    {
        "id" : 9,
        "name": "Kiko Loureiro",
        "email": "Kiko@gmail.com"
    },
    {
        "id" : 10,
        "name": "Teteu Miranda",
        "email": "Teteu@gmail.com"
    },
    {
        "id" : 11,
        "name": "Joana Dark",
        "email": "Joana@gmail.com"
    },
    {
        "id" : 12,
        "name": "Gasparzinho",
        "email": "Gasparzinho@gmail.com"
    }
]
JSON;

$json = json_decode($json, true);

$page = $data['page'] - 1;
$perPage = $data['perPage'];

$return = [];

for ($i = ($page * $perPage); $i < (($page * $perPage) + $perPage); $i++) {
  if ($json[$i]) {
    $return[] = $json[$i];
  }
}

echo json_encode([
  'data' => $return,
  'meta' => [
    'pagination' => [
      'currentPage' => $data['page'],
      'totalPages' => ceil(count($json) / $perPage),
    ]
  ]
]);
