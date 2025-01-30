import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid, List } from "lucide-react";

// Types
type ViewMode = "grid" | "list";

interface NFTData {
  contractAddress: string;
  description: string;
  id: string;
  imageUrl: string;
  title: string;
  tokenId: string;
}

interface NFTContextType {
  currentPage: number;
  itemsPerPage: number;
  nfts: NFTData[];
  setCurrentPage: (page: number) => void;
  setViewMode: (mode: ViewMode) => void;
  viewMode: ViewMode;
}

interface NFTRootProps {
  children: React.ReactNode;
  itemsPerPage?: number;
  nfts: NFTData[];
}

interface NFTContainerProps {
  children: React.ReactNode;
}

interface NFTDescriptionProps {
  description: string;
}

interface NFTImageProps {
  alt: string;
  src: string;
  viewMode: ViewMode;
}

interface NFTTitleProps {
  title: string;
}

interface NFTActionsProps {
  tokenId: string;
}

interface NFTCardProps {
  nft: NFTData;
}

// Context
const NFTContext = React.createContext<NFTContextType | undefined>(undefined);

// Hook
function useNFTContext(): NFTContextType {
  const context = React.useContext(NFTContext);
  if (!context) {
    throw new Error("NFT components must be used within NFT.Root");
  }
  return context;
}

// Root Component
export function NFTRoot({
  children,
  itemsPerPage = 12,
  nfts,
}: NFTRootProps): JSX.Element {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  return (
    <NFTContext.Provider
      value={{
        currentPage,
        itemsPerPage,
        nfts,
        setCurrentPage,
        setViewMode,
        viewMode,
      }}
    >
      <div className="w-full space-y-4">{children}</div>
    </NFTContext.Provider>
  );
}

// ViewControls Component
export function NFTViewControls(): JSX.Element {
  const { setViewMode, viewMode } = useNFTContext();

  return (
    <div className="flex justify-end mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">
            {viewMode === "grid" ? (
              <Grid className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewMode("grid")}>
            <Grid className="mr-2 h-4 w-4" /> Grid View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setViewMode("list")}>
            <List className="mr-2 h-4 w-4" /> List View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Container Component
export function NFTContainer({ children }: NFTContainerProps): JSX.Element {
  const { viewMode } = useNFTContext();

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "space-y-4"
      }
    >
      {children}
    </div>
  );
}

// NFT Title Component
export function NFTTitle({ title }: NFTTitleProps): JSX.Element {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}

// NFT Description Component
export function NFTDescription({
  description,
}: NFTDescriptionProps): JSX.Element {
  return <p className="text-sm text-gray-600">{description}</p>;
}

// NFT Image Component
function NFTImage({ alt, src, viewMode }: NFTImageProps): JSX.Element {
  return (
    <div className={viewMode === "list" ? "w-48 h-48 flex-shrink-0" : ""}>
      <img
        alt={alt}
        className="w-full h-full object-cover rounded-t-lg"
        src={src}
      />
    </div>
  );
}

// NFT Actions Component
export function NFTActions({ tokenId }: NFTActionsProps): JSX.Element {
  const handleTransfer = async (): Promise<void> => {
    // Implement transfer logic using viem/wagmi
    console.log("Transfer NFT:", tokenId);
  };

  return (
    <button onClick={handleTransfer} type="button">
      Transfer
    </button>
  );
}

// NFT Card Component
export function NFTCard({ nft }: NFTCardProps): JSX.Element {
  const { viewMode } = useNFTContext();

  return (
    <Card className={viewMode === "list" ? "flex flex-row" : ""}>
      <NFTImage alt={nft.title} src={nft.imageUrl} viewMode={viewMode} />
      <div className="flex-1">
        <CardHeader>
          <NFTTitle title={nft.title} />
        </CardHeader>
        <CardContent>
          <NFTDescription description={nft.description} />
        </CardContent>
        <CardFooter>
          <NFTActions tokenId={nft.tokenId} />
        </CardFooter>
      </div>
    </Card>
  );
}

// Pagination Component
export function NFTPagination(): JSX.Element {
  const { currentPage, itemsPerPage, nfts, setCurrentPage } = useNFTContext();
  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        type="button"
      >
        Previous
      </button>
      <span className="py-2 px-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
