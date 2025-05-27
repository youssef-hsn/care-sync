import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, Loader2, XIcon } from 'lucide-react';
import { Input } from '@/components/atoms/input';
import { api } from '@/lib/api';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from '@/components/atoms/dialog';
import { cn } from '@/lib/utils/shadcn';
import { Button } from '../atoms/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../atoms/tooltip';

interface DropdownInputProps<T> {
  endpoint: string;
  onSelect: (item: T) => void;
  onClear?: () => void;
  ItemDisplay: (item: T) => React.ReactNode;
  CreateNewForm?: React.FC<{onComplete: () => void}>;
  placeholder?: string;
  className?: string;
}

export function DropdownInput<T>({
  endpoint,
  onSelect,
  onClear,
  ItemDisplay,
  CreateNewForm,
  placeholder = 'Search...',
  className = '',
}: DropdownInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: [endpoint, inputValue],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        params: {
          search: inputValue,
          size: 5,
        },
      });
      return response.data;
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsOpen(false);
    setInputValue('');
    setSelectedItem(item);
  };

  const handleCreateNew = () => {
    setIsOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <div className={cn('relative w-1/3', className)}>
      {selectedItem && (
        <div className="flex items-center gap-2 cursor-pointer">
          {ItemDisplay(selectedItem)}
          <Tooltip >
            <TooltipContent>
              Clear Selection
            </TooltipContent>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" onClick={() => {
                setSelectedItem(null);
                onClear && onClear();
              }}>
                <XIcon />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      )}
      {!selectedItem && (
        <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />)}

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 bg-background border border-border rounded-md shadow-lg overflow-auto w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </div>
          ) : items.length > 0 ? (
            <div>
              {items.map((item: T, index: number) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  {ItemDisplay(item)}
                </div>
              ))}
            </div>
          ) : inputValue.length > 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found
            </div>
          ) : null}

          {CreateNewForm && <div
            onClick={handleCreateNew}
            className="flex items-center px-4 py-2 border-t border-border hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 mr-2 text-primary" />
            <span>Create New</span>
          </div>}
        </div>
      )}

      {CreateNewForm && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New</DialogTitle>
            </DialogHeader>
            <CreateNewForm onComplete={() => {
              setIsDialogOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
