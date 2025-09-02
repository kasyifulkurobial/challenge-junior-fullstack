"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

const Case2Page = () => {
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentTree, setCommentTree] = useState([]);

  // Data komentar dari soal

  const comments = useMemo(
    () => [
      {
        commentId: 1,
        commentContent: "Hai",
        replies: [
          {
            commentId: 11,
            commentContent: "Hai juga",
            replies: [
              {
                commentId: 111,
                commentContent: "Haai juga hai jugaa",
              },
              {
                commentId: 112,
                commentContent: "Haai juga hai jugaa",
              },
            ],
          },
          {
            commentId: 12,
            commentContent: "Hai juga",
            replies: [
              {
                commentId: 121,
                commentContent: "Haai juga hai jugaa",
              },
            ],
          },
        ],
      },
      {
        commentId: 2,
        commentContent: "Halooo",
      },
    ],
    []
  );

  // Fungsi rekursif untuk menghitung total komentar
  const countTotalComments = useCallback((commentsList) => {
    let total = 0;

    commentsList.forEach((comment) => {
      total += 1; // Hitung komentar saat ini

      // Jika ada replies, hitung secara rekursif
      if (comment.replies && comment.replies.length > 0) {
        total += countTotalComments(comment.replies);
      }
    });

    return total;
  }, []);

  // Komponen untuk menampilkan komentar secara hierarkis
  const CommentItem = ({ comment, level = 0 }) => {
    const indentClass = level > 0 ? `ml-${level * 8}` : "";
    const bgColor = level % 2 === 0 ? "bg-blue-50" : "bg-green-50";

    return (
      <div className={`${indentClass} mb-4`}>
        <div className={`${bgColor} rounded-lg p-4 border-l-4 ${level % 2 === 0 ? "border-blue-400" : "border-green-400"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Comment ID: {comment.commentId}</span>
            <span className="text-xs text-gray-500">Level: {level}</span>
          </div>
          <p className="text-gray-800">{comment.commentContent}</p>
        </div>

        {comment.replies && comment.replies.map((reply) => <CommentItem key={reply.commentId} comment={reply} level={level + 1} />)}
      </div>
    );
  };

  useEffect(() => {
    const total = countTotalComments(comments);
    setTotalComments(total);
    setCommentTree(comments);
    setLoading(false);
  }, [comments, countTotalComments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case 2: Technical Test - Comments Counter</h1>
          <p className="text-xl text-gray-600">Menghitung total komentar termasuk semua balasan (nested comments)</p>
        </div>

        {/* Hasil Total */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Total Komentar</h2>
          <div className="text-6xl font-bold text-blue-500 mb-4">{totalComments}</div>
          <p className="text-gray-600 text-lg">Komentar (termasuk semua balasan)</p>
        </div>

        {/* Algoritma Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Algoritma Solusi</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-green-400 text-sm overflow-x-auto">
              {`const countTotalComments = (commentsList) => {
                                                        let total = 0
                                                        
                                                        commentsList.forEach(comment => {
                                                        total += 1 // Hitung komentar saat ini
                                                        
                                                        // Jika ada replies, hitung secara rekursif
                                                        if (comment.replies && comment.replies.length > 0) {
                                                        total += countTotalComments(comment.replies)
                                                        }
                                                        })
                                                        
                                                        return total
                                                 }`}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>Penjelasan:</strong> Fungsi ini menggunakan pendekatan rekursif untuk menghitung semua komentar. Setiap komentar dihitung sebagai 1, kemudian jika ada replies, fungsi memanggil dirinya sendiri untuk menghitung replies
              tersebut.
            </p>
          </div>
        </div>

        {/* Visualisasi Hierarki Komentar */}
        <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Visualisasi Hierarki Komentar</h2>
          <div className="space-y-4">
            {commentTree.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>
        </div>

        {/* Breakdown Perhitungan */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Breakdown Perhitungan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Komentar Utama #1:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Komentar ID 1: "Hai" (1)</li>
                <li>• Reply ID 11: "Hai juga" (1)</li>
                <li>• Reply ID 111: "Haai juga hai jugaa" (1)</li>
                <li>• Reply ID 112: "Haai juga hai jugaa" (1)</li>
                <li>• Reply ID 12: "Hai juga" (1)</li>
                <li>• Reply ID 121: "Haai juga hai jugaa" (1)</li>
              </ul>
              <p className="font-semibold text-blue-600">Subtotal: 6 komentar</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Komentar Utama #2:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Komentar ID 2: "Halooo" (1)</li>
              </ul>
              <p className="font-semibold text-blue-600">Subtotal: 1 komentar</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-semibold text-center">Total: 6 + 1 = 7 komentar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case2Page;
