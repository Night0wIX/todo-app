export interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onCompleteSelected: () => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  isLoading?: boolean;
}