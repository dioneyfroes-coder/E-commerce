// src/components/ProductReviews.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useReviews } from '../context/ReviewsContext';
import { Review } from '../types';

const ProductReviews = ({ productId }: { productId: string }) => {
  const { reviews, fetchReviews, addReview } = useReviews();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');

  const fetchProductReviews = useCallback(async () => {
    await fetchReviews(productId);
  }, [fetchReviews, productId]);

  useEffect(() => {
    fetchProductReviews();
  }, [fetchProductReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const review: Omit<Review, 'date' | 'id'> = {
      productId,
      rating,
      comment,
      name: name || 'Anônimo',
      userId: '123', // Exemplo: substituir pelo ID do usuário autenticado
    };
    await addReview(productId, review);
    setRating(0);
    setComment('');
    setName('');
    fetchProductReviews(); // Atualiza os reviews após adicionar um novo
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {Array.isArray(reviews) &&
          reviews
            .filter((review: Review) => review.productId === productId)
            .map((review: Review) => (
              <li key={`${review.productId}-${review.id ?? Math.random()}`}>
                <p>{review.name}</p>
                <p>{review.rating} estrelas</p>
                <p>{review.comment}</p>
                <p>{new Date(review.date).toLocaleString()}</p>
              </li>
            ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Nome (opcional):
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Avaliação:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="0"
            max="5"
          />
        </label>
        <label>
          Comentário:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Enviar Review</button>
      </form>
    </div>
  );
};

export default ProductReviews;
