<?php

namespace App\Events;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class InvoiceChronoSubscriber implements EventSubscriberInterface 
{
    private $security;

    private $repo;

    public function __construct(Security $security, InvoiceRepository $repo) {
        $this->security = $security;
        $this->repo = $repo;
    }
    

    public static function getSubscribedEvents() 
    {
        return [
            // evenement du kernel => ['nom de la fonction à appliquer', prorité(à quelle moment précis)]
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(GetResponseForControllerResultEvent $event) {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        
        if ($result instanceof Invoice && $method === "POST") {
            $user = $this->security->getUser();
            $nextChrono = $this->repo->findNextChrono($user);
            $result->setChrono($nextChrono);

        // gestion du sentAt si il n'est pas renseigné
            if (empty($result->getSentAt())) {
                $result->setSentAt(new\DateTime());
            }
            
        }
    }

    

}