import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/common/Icon';
import { 
  Document, 
  formatFileSize, 
  formatLastUpdated, 
  getCategoryDisplayName, 
  getLevelDisplayName 
} from '@/lib/utils/document-helpers';

interface DocumentCardProps {
  document: Document;
  showCategory?: boolean;
  showLevel?: boolean;
  className?: string;
}

/**
 * DocumentCard component for displaying document information in a card format
 */
export function DocumentCard({ 
  document, 
  showCategory = true, 
  showLevel = true, 
  className 
}: DocumentCardProps) {
  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = document.downloadUrl;
    link.download = document.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {document.title}
            </CardTitle>
            {document.description && (
              <CardDescription className="mt-1 line-clamp-2">
                {document.description}
              </CardDescription>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {showLevel && (
            <Badge variant="secondary" className="text-xs">
              {getLevelDisplayName(document.level)}
            </Badge>
          )}
          {showCategory && (
            <Badge variant="outline" className="text-xs">
              {getCategoryDisplayName(document.category)}
            </Badge>
          )}
          {document.topic && (
            <Badge variant="outline" className="text-xs capitalize">
              {document.topic.replace('-', ' ')}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{formatFileSize(document.fileSize)}</span>
          <span>{formatLastUpdated(document.lastUpdated)}</span>
        </div>
        
        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{document.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          onClick={handleDownload}
          className="w-full"
          size="sm"
        >
          <ActionIcon action="download" size="sm" className="mr-2" />
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
}