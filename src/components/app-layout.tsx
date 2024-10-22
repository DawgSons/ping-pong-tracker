import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Disc, Info } from "lucide-react"
import MapViewComponent from "./MapView"
import { TableService } from "@/services/tableService"
import NewEntryModal from "./NewEntryModal"
import { ToggleContext } from "@/lib/ToggleContext"

export function AppLayoutComponent() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const toggleOverlay = () => setIsOverlayOpen(!isOverlayOpen)
  const context = {
    isOverlayOpen,
    toggleOverlay,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Tabs defaultValue="platten" className="w-full h-full flex flex-col z-50">
        <main className="flex-1 overflow-hidden">
          <TabsContent value="platten" style={{height: "100vh"}} className="w-full">
              <MapViewComponent />
              <Button
                className="fixed right-4 bottom-20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white z-50"
                onClick={toggleOverlay}>
                <Plus size={24} />
                </Button>
          </TabsContent>
          <TabsContent value="info" className="p-4 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Info Content</h2>
            <p>Your Info content goes here.</p>
          </TabsContent>
        </main>

        <TabsList className="fixed bottom-0 left-0 right-0 grid w-full grid-cols-2 bg-background border-t border-border z-50">
          <TabsTrigger value="platten" className="flex flex-col items-center py-2">
            <Disc className="w-5 h-5 mb-1" />
            Platten
          </TabsTrigger>
          <TabsTrigger value="info" className="flex flex-col items-center py-2">
            <Info className="w-5 h-5 mb-1" />
            Info
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ToggleContext.Provider value={context}>
        {isOverlayOpen && <NewEntryModal />}
      </ToggleContext.Provider>
    </div>
  )
}