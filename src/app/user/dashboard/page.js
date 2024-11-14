// src/app/user/dashboard/page.js

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function UserDashboardPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([
        // Questi ordini saranno sostituiti da dati dinamici recuperati dal backend
        { id: 1, name: 'Torta alla crema', status: 'In Preparazione' },
        { id: 2, name: 'Bignè alla cioccolata', status: 'Pronto per il Ritiro' },
    ]);
    const [orderHistory, setOrderHistory] = useState([
        { id: 3, name: 'Millefoglie', status: 'Completato' },
    ]);
    const [comment, setComment] = useState("");


    const handleCommentSubmit = () => {
        alert(`Commento inviato: ${comment}`);
        setComment(""); // Reset del commento dopo l'invio

        // Questo dovrà poi essere modificato per aggiungere il backend:
        // Integrazione Backend: invia il commento al server per salvarlo
        // esempio: saveComment(comment).then(() => {...});
    };

    return (
<div class={styles.sfondo}>
<div class={styles.mainContainer}>  
    <h1 class={styles.tittle}>Ciao Utente</h1>  
        <div class={styles.subContainer1}>    
            <div class={styles.box1}>      
                <h2 class={styles.h2}>Cronologia degli Ordini</h2>      
                <ul class={styles.order_list}>          
                    <li>Ordine #12345 - 12/11/2023</li>        
                    <li>Ordine #12346 - 13/11/2023</li>        
                    <li>Ordine #12347 - 14/11/2023</li>        
                    <li>Ordine #12348 - 15/11/2023</li>        
                    <li>Ordine #12345 - 12/11/2023</li>        
                    <li>Ordine #12346 - 13/11/2023</li>     
                    <li>Ordine #12347 - 14/11/2023</li>        
                    <li>Ordine #12348 - 15/11/2023</li>      
                </ul>    
            </div>    
        <div class={styles.box2}>      
                        <h2 class={styles.h2} >Storico Ordini e Stato</h2>      
            <ul class={styles.order_list}>        
                <li>          
                    <div class={styles.order_list}>            
                        <span>Ordine #12345 - 12/11/2023</span>
                        <span class={styles.status_processing}>In elaborazione</span>          
                    </div>        
                </li>        
                <li>          
                    <div class={styles.order_list}>            
                        <span>Ordine #12346 - 13/11/2023</span>            
                        <span class={styles.status_shipped}>Spedito</span>          
                    </div>        
                </li>        
                <li>          
                    <div class={styles.order_list}>            
                        <span class={styles.order_details_intern}>Ordine #12347 - 14/11/2023</span>            
                        <span class={styles.status_delivered}>Consegnato</span>          
                    </div>        
                </li>        
                <li>          
                    <div class={styles.order_list}>            
                        <span>Ordine #12348 - 15/11/2023</span>            
                        <span class={styles.status_cancelled}>Annullato</span>          
                    </div>        
                </li>      
            </ul>   
        </div>  
        
    </div>  
    <div class={styles.subContainer2}>    
        <div class={styles.box3}>      
            <div class={styles.comment_box}>      
                <h2>Lascia un commento</h2>      
                <form action="/submit_comment" method="POST">        
                    <label for="comment">Commento:</label>        
                    <textarea id="comment" name="comment" placeholder="Scrivi qui il tuo commento..." required></textarea>        
                    <button type="submit">Invia Commento</button>      
                </form>    
            </div>    
        </div>  
      </div>
</div>
</div>
    );

}
