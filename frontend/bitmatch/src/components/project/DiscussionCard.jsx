"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReplyForm({ postId, onCancel, onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(postId, content);
      setContent("");
    }
  };

  return (
    <div className="border p-4 mb-4">
      <div className="mb-4">
        <textarea
          placeholder="Add your comments here"
          className="w-full p-4 min-h-[100px] border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="secondary"
          className="bg-gray-300 hover:bg-gray-400 text-black"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="bg-gray-300 hover:bg-gray-400 text-black"
          onClick={handleSubmit}
        >
          Comment
        </Button>
      </div>
    </div>
  );
}

export function DiscussionPost({
  id,
  author,
  content,
  datePosted,
  isReply = false,
  parentId,
  onReply,
  onDelete,
  onReaction,
}) {
  return (
    <div className={`border-t py-4 ${isReply ? "ml-12 relative" : ""}`}>
      {isReply && (
        <div className="absolute left-[-24px] top-0 bottom-0 w-[2px] bg-gray-300"></div>
      )}

      <div className="flex">
        <div className="mr-4 relative">
          <div className="bg-white border rounded-lg px-3 py-1 absolute top-0 left-0 z-10">
            <span className="font-semibold">{isReply ? "Reply" : "Post"}</span>
          </div>
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-sm mt-8">
            {author.profileImage ? (
              <img
                src={author.profileImage || "/placeholder.svg"}
                alt={`${author.name}'s profile`}
                width={80}
                height={80}
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <span className="text-center">
                img
                <br />
                profile
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 mt-8">
            <h3 className="font-bold text-lg">{author.name}</h3>
            {author.title && <p>{author.title}</p>}
            <p className="text-sm text-gray-600">{datePosted}</p>
          </div>

          <div className="mb-4">
            <p>{content}</p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              className="bg-gray-300 hover:bg-gray-400 text-black"
              onClick={() => onReply && onReply(id)}
            >
              Reply
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-300 hover:bg-gray-400 text-black"
              onClick={() => onDelete && onDelete(id)}
            >
              Delete Post
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-300 hover:bg-gray-400 text-black ml-auto"
              onClick={() => onReaction && onReaction(id)}
            >
              Emoji Reactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}