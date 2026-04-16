// ASSISTENTE VIRTUAL DE IA DA LANDING PAGE

"use client";

import { useState } from "react";
import { faqAIConversationalAssistant } from "@/ai/flows/faq-ai-conversational-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: 'Olá! Sou o assistente da UrbanSync. Como posso ajudar você hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await faqAIConversationalAssistant({ query: userMsg });
      setMessages(prev => [...prev, { role: 'ai', content: result.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Desculpe, tive um problema ao processar sua pergunta. Tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col border-accent/20 bg-background/95 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between py-4 bg-primary/20">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              <CardTitle className="text-base font-headline">Assistente UrbanSync</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.role === 'user' 
                      ? 'bg-accent text-accent-foreground ml-4' 
                      : 'bg-secondary text-foreground mr-4'
                    }`}>
                      <div className="flex items-center gap-1 mb-1 opacity-70 text-[10px] uppercase font-bold">
                        {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        {msg.role === 'user' ? 'Você' : 'Assistente AI'}
                      </div>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary p-3 rounded-lg animate-pulse text-xs text-muted-foreground">
                      Pensando...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form 
              className="flex w-full gap-2" 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
              <Input 
                placeholder="Pergunte algo..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-secondary/50 border-none focus-visible:ring-accent"
              />
              <Button size="icon" disabled={isLoading} className="bg-accent hover:bg-accent/80 text-accent-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-2xl bg-accent hover:bg-accent/80 text-accent-foreground flex items-center justify-center transition-all hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
