import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import ReviewService from "api/services/ReviewService";

export default function LeaveReviewPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(null); // "valid", "invalid", "used", etc.
  const [loading, setLoading] = useState(false);

  const [width, height] = useWindowSize();

  const GOOGLE_REVIEW_URL = "https://g.page/r/CZEYncd4KNacEBM/review";

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await ReviewService.leaveReview(code);
      if (response.status === 404) {
        setStatus('invalid');
        return;
      }

      const reviewCode = response.data;
      if (reviewCode.isUsed || response.status === 410) {
        setStatus('used');
        return;
      }

      setStatus('valid');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center space-y-6">
      <h1 className="text-3xl font-bold text-[#f7c948]">Leave a Review</h1>

      <input
        type="text"
        placeholder="Enter your code"
        value={code}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        onChange={(e) => setCode(e.target.value)}
        className="w-full border px-4 py-2 rounded shadow bg-[#f4f4f4] text-[#0d0d0d] placeholder-[#888]"
      />

      <button
        onClick={handleSubmit}
        className="bg-[#f7c948] text-black font-bold px-6 py-2 rounded hover:bg-[#ddb861] transition-all duration-200"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Submit'}
      </button>

      {status === 'valid' && (
        <div className="relative text-[#f7c948] font-semibold mt-6">
          <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
          <p className="text-2xl mb-2">🎉 Congrats! You’ve been selected.</p>
          <p className="text-white mb-4">We’d love your honest review — it helps us grow the movement.</p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-2 rounded bg-[#f7c948] text-black font-bold hover:bg-[#ddb861] transition-all"
          >
            Leave a Review
          </a>
        </div>
      )}

      {status === 'used' && <p className="text-[#ddb861]">⚠️ This code has already been used.</p>}
      {status === 'invalid' && <p className="text-[#8a0303]">❌ Invalid code. Try again.</p>}
      {status === 'error' && <p className="text-[#8a0303]">⚠️ Code does not exist.</p>}
    </div>
  );
}
