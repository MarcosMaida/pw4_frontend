"use client";

import { useState } from 'react';
import styles from './inventory.module.css';

export default function InventoryPage() {
    // Stato dei prodotti. Questo sarà modificato per prelevare i dati dinamicamente dal backend.
    const [products, setProducts] = useState([
        { id: 1, name: 'Torta alla crema', description: 'Deliziosa torta con crema fresca', stock: 10 },
        { id: 2, name: 'Bignè alla cioccolata', description: 'Bignè ripieni di cioccolato fondente', stock: 5 },
    ]);

    // per aggiungere o modificare un prodotto
    const [formData, setFormData] = useState({ id: null, name: '', description: '', stock: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            // Modifica di un prodotto esistente
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === formData.id ? { ...formData, stock: parseInt(formData.stock) } : product
                )
            );
            // Questo dovrà poi essere modificato per aggiungere il backend:
            // Qui si integrerà una chiamata API per aggiornare il prodotto nel database
            // esempio: updateProduct(formData).then(() => {...});
        } else {
            // Aggiunta di un nuovo prodotto
            const newProduct = {
                ...formData,
                id: products.length + 1, // L'ID sarà gestito dal database nel backend
                stock: parseInt(formData.stock),
            };
            setProducts([...products, newProduct]);

            // Questo dovrà poi essere modificato per aggiungere il backend:
            // Qui si integrerà una chiamata API per aggiungere un nuovo prodotto nel database
            // esempio: addProduct(newProduct).then(() => {...});
        }
        setFormData({ id: null, name: '', description: '', stock: '' });
    };

    const handleEdit = (product) => {
        setFormData(product);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));

        // Questo dovrà poi essere modificato per aggiungere il backend:
        // Qui si integrerà una chiamata API per eliminare il prodotto dal database
        // esempio: deleteProduct(id).then(() => {...});
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Gestione del Magazzino</h1>

            {/* Lista dei prodotti attualmente nel magazzino */}
            <ul className={styles.productList}>
                {products.map((product) => (
                    <li key={product.id} className={styles.productItem}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Disponibilità: {product.stock}</p>
                        <div className={styles.actions}>
                            <button className={styles.editButton} onClick={() => handleEdit(product)}>Modifica</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>Elimina</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Form per aggiungere o modificare un prodotto */}
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <h2>{formData.id ? 'Modifica Prodotto' : 'Aggiungi Nuovo Prodotto'}</h2>
                <label className={styles.formLabel}>
                    Nome:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Descrizione:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Disponibilità:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>
                    {formData.id ? 'Salva Modifiche' : 'Aggiungi Prodotto'}
                </button>
            </form>
        </div>
    );
}
