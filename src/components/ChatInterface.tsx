import { useState, useRef, useEffect } from "react";
import { Send, Volume2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TypingAnimation } from "./TypingAnimation";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm here to help you understand government documents. Please upload a document and I'll simplify it for you.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I understand your question about the document. Let me analyze it and provide you with a simplified explanation in your preferred language.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {message.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <Card
                className={`p-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <div className="flex items-start gap-2">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.type === "ai" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => handleSpeak(message.content)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent text-accent-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-3 bg-card">
                <TypingAnimation />
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about your document..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};