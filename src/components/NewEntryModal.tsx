import { TableService } from "@/services/tableService";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ToggleContext } from "@/lib/ToggleContext";
import { useContext } from "react";


export default function NewEntryModal() {
  const context = useContext(ToggleContext);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Add New Data</h3>
          <Button
            className="z-50"
            variant="outline"
            size="icon"
            onClick={context.toggleOverlay}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <form className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input id="photo" type="file" placeholder="Upload photo" />
          </div>
          <Button className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
