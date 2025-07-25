import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { UploadSection } from "@/components/UploadSection";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <UploadSection />
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
