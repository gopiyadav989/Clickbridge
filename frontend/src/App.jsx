import { useState } from 'react'
import SourceSelection from './components/SourceSelection'
import ClickHouseConnection from './components/ClickHouseConnection'
import FlatFileUpload from './components/FlatFileUpload'
import FlatFileConfig from './components/FlatFileConfig'

import './App.css'

function App() {
    // Source selection state
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');

    // Connection state
    const [isConnected, setIsConnected] = useState(false);
    const [connectionConfig, setConnectionConfig] = useState({
        host: 'prb7zori4a.ap-south-1.aws.clickhouse.cloud',
        port: '8443',
        protocol: 'https',
        database: 'default',
        username: 'default',
        password: 'xxxx',
        jwt: ''
    });

    // File state
    const [fileConfig, setFileConfig] = useState({
        filePath: '',
        delimiter: ','
    });

    // Table and column selection state
    const [tables, setTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [joinConditions, setJoinConditions] = useState(['']);

    // Table creation state (for flat file to ClickHouse)
    const [newTableName, setNewTableName] = useState('');
    const [createTable, setCreateTable] = useState(true);

    // Ingestion state
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);

    // Preview state
    const [previewData, setPreviewData] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    // Error state
    const [error, setError] = useState('');

    const resetState = () => {
        setIsConnected(false);
        setTables([]);
        setSelectedTables([]);
        setColumns([]);
        setSelectedColumns([]);
        setJoinConditions(['']);
        setNewTableName('');
        setCreateTable(true);
        setIsProcessing(false);
        setProcessingStatus('');
        setProgress(0);
        setResults(null);
        setPreviewData(null);
        setShowPreview(false);
        setError('');
    };


    const handleSourceChange = (newSource) => {
        resetState();
        setSource(newSource);

        // Set default target based on source
        if (newSource === 'clickhouse') {
            setTarget('flatfile');
        } else if (newSource === 'flatfile') {
            setTarget('clickhouse');
        }
    };

    return (

        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Bidirectional ClickHouse & Flat File Data Ingestion Tool
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Source Selection */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Data Source</h2>
                <SourceSelection
                    source={source}
                    onSourceChange={handleSourceChange}
                />
            </div>

            {/* Source Configuration */}
            {source === 'clickhouse' && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">ClickHouse Connection</h2>
                    <ClickHouseConnection
                        connectionConfig={connectionConfig}
                        setConnectionConfig={setConnectionConfig}
                        isConnected={isConnected}
                        setIsConnected={setIsConnected}
                        setError={setError}
                        setTables={setTables}
                    />
                </div>
            )}
            {source === 'flatfile' && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Flat File Upload</h2>
                    <FlatFileUpload
                        setFileConfig={setFileConfig}
                        setIsConnected={setIsConnected}
                        setError={setError}
                    />
                    <FlatFileConfig
                        fileConfig={fileConfig}
                        setFileConfig={setFileConfig}
                    />
                </div>
            )}


        </div>

    )
}

export default App
