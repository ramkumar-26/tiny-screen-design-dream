
import React from 'react';
import { X } from 'lucide-react';

interface Column {
  header: string;
  width?: string;
}

interface SHGTableProps {
  columns: Column[];
  data: any[];
  showDelete?: boolean;
  onDelete?: (index: number) => void;
  showNumbers?: boolean;
}

const SHGTable: React.FC<SHGTableProps> = ({ 
  columns, 
  data, 
  showDelete = false,
  onDelete = () => {},
  showNumbers = true
}) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-shg-primary text-white">
            {showNumbers && <th className="p-2 text-sm border border-gray-300 w-10">#</th>}
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`p-2 text-sm border border-gray-300 ${col.width ? col.width : ''}`}
              >
                {col.header}
              </th>
            ))}
            {showDelete && <th className="p-2 text-sm border border-gray-300 w-10">X</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="bg-white even:bg-gray-50">
                {showNumbers && <td className="p-2 text-center border border-gray-300">{rowIdx + 1}</td>}
                {columns.map((_, colIdx) => (
                  <td key={colIdx} className="p-2 text-center border border-gray-300">
                    {row[colIdx] || '-'}
                  </td>
                ))}
                {showDelete && (
                  <td className="p-2 text-center border border-gray-300">
                    <button 
                      onClick={() => onDelete(rowIdx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="bg-white">
              <td 
                colSpan={showNumbers ? columns.length + (showDelete ? 2 : 1) : columns.length + (showDelete ? 1 : 0)} 
                className="p-3 text-center border border-gray-300 text-gray-500"
              >
                - No data available -
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SHGTable;
