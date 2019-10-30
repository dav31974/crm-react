<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {
    public function updateJwtData(JWTCreatedEvent $event) {
        // récupération de l'user
        $user = $event->getUser();
        // récupération des data
        $data = $event->getData();
        // ajout de firstName et lastName sur les datas
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);
    }
}  