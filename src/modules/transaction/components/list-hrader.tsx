"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import NewTransactionDialog from "./transaction-dialog";

const ListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewTransactionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Transaction</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Transaction
          </Button>
        </div>
      </div>
    </>
  );
};

export default ListHeader;
