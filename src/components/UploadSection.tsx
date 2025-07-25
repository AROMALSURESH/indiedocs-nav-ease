import { useState, useCallback } from "react";
import { Upload, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        setUploadedFile(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="p-6 m-4">
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-accent/50"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload Government Document</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your PDF or scanned document here, or click to browse
          </p>
          
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          <Button asChild className="gap-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-4 w-4" />
              Choose File
            </label>
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3">
            Supported formats: PDF, JPG, PNG (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-green-600">
              <Check className="h-4 w-4" />
              <span className="text-sm">Ready</span>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};