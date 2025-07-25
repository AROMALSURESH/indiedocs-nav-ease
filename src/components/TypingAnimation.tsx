export const TypingAnimation = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-muted-foreground">AI is typing</span>
      <div className="flex gap-1 ml-2">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};