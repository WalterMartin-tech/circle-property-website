'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CloudArrowUpIcon, 
  CameraIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface AnalysisResult {
  totalIssues: number
  criticalIssues: number
  majorIssues: number
  minorIssues: number
  roomAnalysis: RoomAnalysis[]
  estimatedCost: number
  timeToComplete: string
}

interface RoomAnalysis {
  room: string
  issues: Issue[]
}

interface Issue {
  type: 'Critical' | 'Major' | 'Minor'
  description: string
  location: string
  priority: string
  estimatedCost?: number
}

export default function AISnaggingTool() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isContractorModalOpen, setIsContractorModalOpen] = useState(false)
  const [isSecondOpinionModalOpen, setIsSecondOpinionModalOpen] = useState(false)

  const mockFiles = [
    'Living Room - Overview.jpg',
    'Living Room - Corner Detail.jpg', 
    'Kitchen - Countertop.jpg',
    'Kitchen - Appliances.jpg',
    'Master Bedroom - View.jpg',
    'Master Bathroom - Fixtures.jpg',
    'Balcony - Floor Tiles.jpg',
    'Entrance - Door Frame.jpg'
  ]

  const handleFileUpload = () => {
    setUploadedFiles(mockFiles)
    setTimeout(() => {
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisResults({
          totalIssues: 17,
          criticalIssues: 3,
          majorIssues: 8,
          minorIssues: 6,
          estimatedCost: 12500,
          timeToComplete: '5-7 business days',
          roomAnalysis: [
            {
              room: 'Living Room',
              issues: [
                { 
                  type: 'Critical', 
                  description: 'Paint scratch on main wall (12cm)', 
                  location: 'North wall, 1.5m from corner', 
                  priority: 'Fix before handover',
                  estimatedCost: 850
                },
                { 
                  type: 'Minor', 
                  description: 'Slight gap in baseboards', 
                  location: 'East wall near window', 
                  priority: 'Schedule within 7 days',
                  estimatedCost: 200
                }
              ]
            },
            {
              room: 'Kitchen', 
              issues: [
                { 
                  type: 'Major', 
                  description: 'Cabinet door misalignment', 
                  location: 'Upper cabinet #3', 
                  priority: 'Fix before handover',
                  estimatedCost: 450
                },
                { 
                  type: 'Major', 
                  description: 'Grout discoloration around sink', 
                  location: 'Backsplash area', 
                  priority: 'Schedule within 3 days',
                  estimatedCost: 680
                },
                { 
                  type: 'Minor', 
                  description: 'Drawer handle loose', 
                  location: 'Bottom left drawer', 
                  priority: 'Schedule within 7 days',
                  estimatedCost: 75
                }
              ]
            },
            {
              room: 'Master Bedroom',
              issues: [
                { 
                  type: 'Minor', 
                  description: 'Light switch plate gap', 
                  location: 'Entry wall', 
                  priority: 'Schedule within 7 days',
                  estimatedCost: 120
                },
                { 
                  type: 'Critical', 
                  description: 'Window seal damage', 
                  location: 'Main window frame', 
                  priority: 'Fix immediately',
                  estimatedCost: 1200
                }
              ]
            },
            {
              room: 'Master Bathroom',
              issues: [
                { 
                  type: 'Critical', 
                  description: 'Tile crack near shower', 
                  location: 'Shower wall, bottom row', 
                  priority: 'Fix before handover',
                  estimatedCost: 950
                },
                { 
                  type: 'Major', 
                  description: 'Faucet water pressure low', 
                  location: 'Sink area', 
                  priority: 'Schedule within 3 days',
                  estimatedCost: 320
                }
              ]
            }
          ]
        })
      }, 3000)
    }, 500)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload()
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'Major': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'Minor': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'Critical': return <ExclamationTriangleIcon className="w-4 h-4" />
      case 'Major': return <ExclamationTriangleIcon className="w-4 h-4" />
      case 'Minor': return <CheckCircleIcon className="w-4 h-4" />
      default: return <CheckCircleIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-purple-100 rounded-lg mr-4">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">AI-Powered Snagging Tool</h3>
          <p className="text-slate-600 text-sm">Upload property photos for automated defect detection and cost estimation</p>
        </div>
      </div>

      {!uploadedFiles.length && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            dragActive 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CloudArrowUpIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-slate-900 mb-2">Upload Property Photos</h4>
          <p className="text-slate-600 mb-6">
            Drag and drop photos or click to browse. Supports JPG, PNG, HEIC formats.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleFileUpload}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift"
            >
              <CameraIcon className="w-5 h-5 inline mr-2" />
              Choose Photos
            </button>
            
            <div className="text-sm text-slate-500">
              <p>Recommended: 8-12 photos covering all rooms and common areas</p>
              <p>AI works best with well-lit, high-resolution images</p>
            </div>
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && !analysisResults && (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="font-semibold text-slate-900 mb-4">Uploaded Photos ({uploadedFiles.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-white p-3 rounded border border-slate-200">
                  <div className="w-full h-20 bg-slate-100 rounded mb-2 flex items-center justify-center">
                    <EyeIcon className="w-6 h-6 text-slate-600" />
                  </div>
                  <p className="text-xs text-slate-600 truncate">{file}</p>
                </div>
              ))}
            </div>
          </div>

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-50 rounded-lg p-6 border border-purple-200"
            >
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <div>
                  <h4 className="font-semibold text-purple-900">AI Analysis in Progress</h4>
                  <p className="text-sm text-purple-700">Processing images and detecting defects...</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-purple-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Analyzing room layouts and surfaces</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Detecting paint, tile, and fixture issues</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Calculating repair costs and timelines</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence>
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900">{analysisResults.totalIssues}</div>
                <div className="text-sm text-slate-600">Total Issues</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">{analysisResults.criticalIssues}</div>
                <div className="text-sm text-red-700">Critical</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{analysisResults.majorIssues}</div>
                <div className="text-sm text-orange-700">Major</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{analysisResults.minorIssues}</div>
                <div className="text-sm text-yellow-700">Minor</div>
              </div>
            </div>

            {/* Cost & Timeline */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Estimated Repair Cost</h4>
                  <div className="text-3xl font-bold text-blue-600">
                    AED {analysisResults.estimatedCost.toLocaleString()}
                  </div>
                  <p className="text-sm text-blue-700 mt-1">Including materials and labor</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Completion Timeline</h4>
                  <div className="text-3xl font-bold text-blue-600">{analysisResults.timeToComplete}</div>
                  <p className="text-sm text-blue-700 mt-1">Based on issue priority</p>
                </div>
              </div>
            </div>

            {/* Room-by-Room Analysis */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Room-by-Room Analysis</h4>
              <div className="space-y-4">
                {analysisResults.roomAnalysis.map((room, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-900 mb-3">{room.room}</h5>
                    <div className="space-y-3">
                      {room.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className={`p-3 rounded-lg border ${getIssueColor(issue.type)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getIssueIcon(issue.type)}
                              <div className="flex-1">
                                <div className="font-medium">{issue.description}</div>
                                <div className="text-sm opacity-75 mt-1">
                                  <strong>Location:</strong> {issue.location}
                                </div>
                                <div className="text-sm opacity-75">
                                  <strong>Priority:</strong> {issue.priority}
                                </div>
                              </div>
                            </div>
                            {issue.estimatedCost && (
                              <div className="text-sm font-medium">
                                AED {issue.estimatedCost.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift">
                <DocumentArrowDownIcon className="w-5 h-5 inline mr-2" />
                Download Full Report
              </button>
              <button 
                onClick={() => setIsContractorModalOpen(true)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Schedule Contractor Visit
              </button>
              <button 
                onClick={() => setIsSecondOpinionModalOpen(true)}
                className="flex-1 border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Get Second Opinion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contractor Visit Modal */}
      <ConsultationModal
        isOpen={isContractorModalOpen}
        onClose={() => setIsContractorModalOpen(false)}
        consultationType="Contractor Visit Scheduling"
      />

      {/* Second Opinion Modal */}
      <ConsultationModal
        isOpen={isSecondOpinionModalOpen}
        onClose={() => setIsSecondOpinionModalOpen(false)}
        consultationType="Second Opinion Request"
      />

      {!uploadedFiles.length && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-4 text-center text-sm text-slate-600">
            <div>
              <div className="font-medium text-slate-900 mb-1">AI Accuracy</div>
              <div>95%+ defect detection rate</div>
            </div>
            <div>
              <div className="font-medium text-slate-900 mb-1">Processing Time</div>
              <div>2-3 minutes per property</div>
            </div>
            <div>
              <div className="font-medium text-slate-900 mb-1">Cost Estimation</div>
              <div>±15% accuracy range</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
