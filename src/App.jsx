import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, HomeIcon, DocumentTextIcon, ChartBarIcon, UserGroupIcon, PlusIcon, HandRaisedIcon, DocumentDuplicateIcon, DocumentCheckIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const initialNavigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Proposals', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Vote', href: '#', icon: HandRaisedIcon, current: false },
  { name: 'Certificates', href: '#', icon: DocumentCheckIcon, current: false },
  { name: 'Members', href: '#', icon: UserGroupIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState(initialNavigation)
  const [proposals, setProposals] = useState([
    {
      id: 'PROP-001',
      title: 'Treasury Diversification Strategy',
      description: 'Proposal to diversify DAO treasury holdings across multiple stable assets to reduce risk exposure.',
      type: 'Treasury',
      state: 1,
      votesFor: 2456,
      votesAgainst: 1023,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    {
      id: 'PROP-002',
      title: 'Community Grants Program',
      description: 'Establish a quarterly grants program to fund community-driven development initiatives.',
      type: 'Governance',
      state: 7,
      votesFor: 3789,
      votesAgainst: 456,
      endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      creator: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    },
    {
      id: 'PROP-003',
      title: 'Protocol Upgrade v2.0',
      description: 'Major protocol upgrade including gas optimizations and new voting mechanisms.',
      type: 'Technical',
      state: 3,
      votesFor: 1678,
      votesAgainst: 2345,
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      creator: '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec'
    },
    {
      id: 'PROP-004',
      title: 'Governance Parameter Update',
      description: 'Adjust voting period duration and quorum requirements for better community participation.',
      type: 'Governance',
      state: 5,
      votesFor: 4890,
      votesAgainst: 456,
      endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      creator: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30'
    },
    {
      id: 'PROP-005',
      title: 'Marketing Initiative Fund',
      description: 'Allocate funds for Q2 2024 marketing campaigns and community growth initiatives.',
      type: 'Treasury',
      state: 7,
      votesFor: 4567,
      votesAgainst: 789,
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      creator: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    },
    {
      id: 'PROP-006',
      title: 'Emergency Security Patch',
      description: 'Critical security update for smart contract vulnerability.',
      type: 'Technical',
      state: 0,
      votesFor: 0,
      votesAgainst: 0,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      creator: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'
    },
    {
      id: 'PROP-007',
      title: 'Partnership Integration',
      description: 'Strategic partnership with DeFi protocol for liquidity provision.',
      type: 'Governance',
      state: 6,
      votesFor: 2567,
      votesAgainst: 2789,
      endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      creator: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0'
    },
    {
      id: 'PROP-008',
      title: 'Community Event Budget',
      description: 'Budget allocation for Q2 community events and hackathons.',
      type: 'Treasury',
      state: 2,
      votesFor: 567,
      votesAgainst: 234,
      endDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      creator: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db'
    }
  ])
  const [tokenBalance, setTokenBalance] = useState('1000')
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [proposalForm, setProposalForm] = useState({
    title: '',
    description: '',
    amount: '',
    recipient: ''
  })
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [certificateForm, setCertificateForm] = useState({
    recipientName: '',
    recipientAddress: '',
    certificateType: 'membership',
    description: ''
  })
  const [certificates, setCertificates] = useState([
    {
      id: '001',
      certificateType: 'membership',
      recipientName: 'John Doe',
      recipientAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      issueDate: '2024-01-15',
      status: 'Valid',
      description: 'DAO Membership Certificate',
      verificationCode: 'DAO-MEM-2024-001'
    },
    {
      id: '002',
      certificateType: 'achievement',
      recipientName: 'Jane Smith',
      recipientAddress: '0x9876543210abcdef9876543210abcdef98765432',
      issueDate: '2024-01-20',
      status: 'Valid',
      description: 'Outstanding Contribution Achievement',
      verificationCode: 'DAO-ACH-2024-001'
    },
    {
      id: '003',
      certificateType: 'contribution',
      recipientName: 'Alice Johnson',
      recipientAddress: '0xfedcba9876543210fedcba9876543210fedcba98',
      issueDate: '2024-01-25',
      status: 'Valid',
      description: 'Project Development Contribution',
      verificationCode: 'DAO-CON-2024-001'
    }
  ])
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [showViewCertificateModal, setShowViewCertificateModal] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showProposalDetailsModal, setShowProposalDetailsModal] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationForm, setVerificationForm] = useState({
    verificationCode: '',
    recipientAddress: ''
  })
  const [verificationResult, setVerificationResult] = useState(null)
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [voteForm, setVoteForm] = useState({
    support: true, // true for Yes, false for No
    reason: ''
  })

  // Add admin state and mint modal state
  const [isAdmin] = useState(true) // In real implementation, this would be checked from the smart contract
  const [showMintModal, setShowMintModal] = useState(false)
  const [mintForm, setMintForm] = useState({
    recipientAddress: '',
    amount: '',
  })

  // Add delegation states
  const [showDelegateModal, setShowDelegateModal] = useState(false)
  const [delegateForm, setDelegateForm] = useState({
    delegateTo: '',
  })
  const [votingPower, setVotingPower] = useState('0')
  const [isDelegated, setIsDelegated] = useState(false)

  // Sample members data
  const [members] = useState([
    {
      id: '001',
      name: 'John Doe',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      role: 'Admin',
      joinDate: '2024-01-01',
      status: 'Active',
      votingPower: 1000,
      proposalsCreated: 5,
      proposalsVoted: 12
    },
    {
      id: '002',
      name: 'Jane Smith',
      walletAddress: '0x9876543210abcdef9876543210abcdef98765432',
      role: 'Member',
      joinDate: '2024-01-05',
      status: 'Active',
      votingPower: 500,
      proposalsCreated: 2,
      proposalsVoted: 8
    },
    {
      id: '003',
      name: 'Alice Johnson',
      walletAddress: '0xfedcba9876543210fedcba9876543210fedcba98',
      role: 'Moderator',
      joinDate: '2024-01-10',
      status: 'Active',
      votingPower: 750,
      proposalsCreated: 3,
      proposalsVoted: 10
    },
    {
      id: '004',
      name: 'Bob Wilson',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      role: 'Member',
      joinDate: '2024-01-15',
      status: 'Inactive',
      votingPower: 250,
      proposalsCreated: 1,
      proposalsVoted: 4
    }
  ])

  // Add new state for voting history
  const [votingHistory] = useState([
    {
      proposalId: 'PROP-H001',
      proposalTitle: 'Implement New Governance Model',
      vote: true,
      reason: 'This will improve our decision-making process and increase community participation',
      timestamp: '2024-01-16T10:30:00Z'
    },
    {
      proposalId: 'PROP-H002',
      proposalTitle: 'Treasury Fund Allocation Q1',
      vote: false,
      reason: 'Budget allocation needs more clarity and better risk assessment',
      timestamp: '2024-01-12T15:45:00Z'
    },
    {
      proposalId: 'PROP-H003',
      proposalTitle: 'Smart Contract Upgrade v1.5',
      vote: true,
      reason: 'Critical security improvements and gas optimizations',
      timestamp: '2024-01-10T09:15:00Z'
    },
    {
      proposalId: 'PROP-H004',
      proposalTitle: 'Community Rewards Program',
      vote: true,
      reason: 'Will incentivize long-term community engagement',
      timestamp: '2024-01-08T14:20:00Z'
    },
    {
      proposalId: 'PROP-H005',
      proposalTitle: 'Protocol Fee Structure Update',
      vote: false,
      reason: 'Proposed fees are too high for smaller participants',
      timestamp: '2024-01-05T11:30:00Z'
    },
    {
      proposalId: 'PROP-H006',
      proposalTitle: 'Cross-Chain Integration Proposal',
      vote: true,
      reason: 'Essential for ecosystem growth and liquidity',
      timestamp: '2024-01-03T16:45:00Z'
    },
    {
      proposalId: 'PROP-H007',
      proposalTitle: 'Emergency Fund Establishment',
      vote: true,
      reason: 'Prudent risk management measure',
      timestamp: '2024-01-01T08:00:00Z'
    }
  ])

  // Handle navigation click
  const handleNavClick = (clickedItem) => {
    const updatedNavigation = navigation.map(item => ({
      ...item,
      current: item.name === clickedItem.name
    }))
    setNavigation(updatedNavigation)
    setSidebarOpen(false) // Close mobile sidebar after navigation
  }

  // Handle create proposal
  const handleCreateProposal = () => {
    setShowProposalModal(true)
  }

  const handleProposalSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would typically interact with your smart contract
      console.log('Submitting proposal:', proposalForm)
      
      // Add to local state for immediate UI update
      setProposals(prev => [...prev, { 
        id: prev.length + 1,
        ...proposalForm,
        state: 1,
        votesFor: 0,
        votesAgainst: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        type: 'Governance'
      }])
      
      setShowProposalModal(false)
      setProposalForm({ title: '', description: '', amount: '', recipient: '' })
    } catch (error) {
      console.error('Error creating proposal:', error)
    }
  }

  // Format the time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return 'just now'
  }

  // Sort proposals by creation date
  const sortedProposals = [...proposals].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  )

  // Get recent proposals for activity feed
  const recentProposals = sortedProposals.slice(0, 3)

  // Mobile sidebar
  const MobileSidebar = () => (
    <Dialog as="div" className="md:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
      <div className="fixed inset-0 z-40 flex">
        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-dark-300">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          {/* Mobile navigation items */}
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <div className="h-8 w-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple text-transparent bg-clip-text">
                DAO Dashboard
              </h1>
            </div>
            <nav className="mt-5 space-y-1 px-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item)
                  }}
                  className={classNames(
                    item.current
                      ? 'bg-dark-400 text-white'
                      : 'text-gray-300 hover:bg-dark-200 hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-accent-purple' : 'text-gray-400 group-hover:text-accent-blue',
                      'mr-4 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )

  // Proposal Modal Component
  const ProposalModal = () => (
    <Transition.Root show={showProposalModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowProposalModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                      Create New Proposal
                    </Dialog.Title>
                    <form onSubmit={handleProposalSubmit} className="mt-2">
                      <div className="space-y-4">
                        <div className="text-left">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={proposalForm.title}
                            onChange={(e) => setProposalForm(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={proposalForm.description}
                            onChange={(e) => setProposalForm(prev => ({ ...prev, description: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                            Amount (ETH)
                          </label>
                          <input
                            type="number"
                            step="0.000000000000000001"
                            name="amount"
                            id="amount"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={proposalForm.amount}
                            onChange={(e) => setProposalForm(prev => ({ ...prev, amount: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="recipient" className="block text-sm font-medium text-gray-300">
                            Recipient Address
                          </label>
                          <input
                            type="text"
                            name="recipient"
                            id="recipient"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={proposalForm.recipient}
                            onChange={(e) => setProposalForm(prev => ({ ...prev, recipient: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple sm:col-start-1 sm:mt-0"
                          onClick={() => setShowProposalModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Proposal Details Modal Component
  const ProposalDetailsModal = () => (
    <Transition.Root show={showProposalDetailsModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowProposalDetailsModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {selectedProposal && (
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                        Proposal Details
                      </Dialog.Title>
                      <div className="mt-4 text-left space-y-4">
                        <div>
                          <h4 className="text-lg font-medium text-white">{selectedProposal.title}</h4>
                          <p className="text-gray-400 mt-1">{selectedProposal.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Amount</p>
                            <p className="text-white font-medium">{selectedProposal.amount} ETH</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              selectedProposal.state === 1 
                                ? 'bg-green-100 text-green-800'
                                : selectedProposal.state === 7
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {selectedProposal.state === 1 ? 'Active' : selectedProposal.state === 7 ? 'Executed' : 'Defeated'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Recipient</p>
                            <p className="text-white font-medium font-mono text-sm">{selectedProposal.recipient}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Created</p>
                            <p className="text-white">{formatTimeAgo(selectedProposal.startDate)}</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                            onClick={() => setShowProposalDetailsModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Certificate Modal Component
  const CertificateModal = () => (
    <Transition.Root show={showCertificateModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowCertificateModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                      Issue New Certificate
                    </Dialog.Title>
                    <form onSubmit={handleCertificateSubmit} className="mt-2">
                      <div className="space-y-4">
                        <div className="text-left">
                          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-300">
                            Recipient Name
                          </label>
                          <input
                            type="text"
                            name="recipientName"
                            id="recipientName"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={certificateForm.recipientName}
                            onChange={(e) => setCertificateForm(prev => ({ ...prev, recipientName: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-300">
                            Recipient Wallet Address
                          </label>
                          <input
                            type="text"
                            name="recipientAddress"
                            id="recipientAddress"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={certificateForm.recipientAddress}
                            onChange={(e) => setCertificateForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="certificateType" className="block text-sm font-medium text-gray-300">
                            Certificate Type
                          </label>
                          <select
                            name="certificateType"
                            id="certificateType"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={certificateForm.certificateType}
                            onChange={(e) => setCertificateForm(prev => ({ ...prev, certificateType: e.target.value }))}
                          >
                            <option value="membership">Membership Certificate</option>
                            <option value="achievement">Achievement Certificate</option>
                            <option value="contribution">Contribution Certificate</option>
                            <option value="custom">Custom Certificate</option>
                          </select>
                        </div>
                        <div className="text-left">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={certificateForm.description}
                            onChange={(e) => setCertificateForm(prev => ({ ...prev, description: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                        >
                          Issue Certificate
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-dark-200 sm:col-start-1 sm:mt-0"
                          onClick={() => setShowCertificateModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Certificate viewing modal
  const ViewCertificateModal = () => (
    <Transition.Root show={showViewCertificateModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowViewCertificateModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {selectedCertificate && (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                        Certificate Details
                      </Dialog.Title>
                      <div className="mt-4 bg-dark-400 rounded-lg p-6 space-y-4 border border-dark-100">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Certificate ID:</span>
                          <span className="text-white">#{selectedCertificate.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white capitalize">{selectedCertificate.certificateType}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Recipient:</span>
                          <span className="text-white">{selectedCertificate.recipientName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Wallet Address:</span>
                          <span className="text-white font-mono text-sm">{selectedCertificate.recipientAddress}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Issue Date:</span>
                          <span className="text-white">{new Date(selectedCertificate.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Status:</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            selectedCertificate.status === 'Valid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedCertificate.status}
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-gray-400 block mb-2">Description:</span>
                          <p className="text-white text-sm">{selectedCertificate.description}</p>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-dark-200"
                          onClick={() => setShowViewCertificateModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Certificates Section Component
  const CertificatesSection = () => (
    <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-lg font-medium leading-6 text-white">Certificates</h3>
            <p className="mt-2 text-sm text-gray-400">
              A list of all certificates issued through the DAO.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
            <button
              type="button"
              onClick={() => setShowVerificationModal(true)}
              className="inline-flex items-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
            >
              Verify Certificate
            </button>
            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              className="inline-flex items-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
            >
              Issue Certificate
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-dark-100 sm:rounded-lg">
                <table className="min-w-full divide-y divide-dark-100">
                  <thead className="bg-dark-400">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Recipient
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Issue Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 bg-dark-300">
                    {certificates.map((certificate) => (
                      <tr key={certificate.id} className="hover:bg-dark-400">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                          #{certificate.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
                          {certificate.certificateType}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {certificate.recipientName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {new Date(certificate.issueDate).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            certificate.status === 'Valid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {certificate.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setShowViewCertificateModal(true);
                            }}
                            className="text-accent-blue hover:text-accent-purple"
                          >
                            View<span className="sr-only">, certificate #{certificate.id}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {certificates.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-400">
                          No certificates issued yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Certificates Section Component
  const PublicVerificationSection = () => (
    <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Verify DAO Certificate</h3>
          <p className="text-gray-400 mb-8">
            Enter the certificate verification code and recipient's wallet address to verify the authenticity of a DAO certificate.
          </p>

          <div className="bg-dark-400 p-6 rounded-lg border border-dark-100">
            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <label htmlFor="pub-verificationCode" className="block text-sm font-medium text-gray-300 text-left">
                  Verification Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="verificationCode"
                    id="pub-verificationCode"
                    placeholder="e.g., DAO-MEM-2024-001"
                    className="mt-1 block w-full rounded-md bg-dark-300 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-3"
                    value={verificationForm.verificationCode}
                    onChange={(e) => setVerificationForm(prev => ({ ...prev, verificationCode: e.target.value }))}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400 text-left">
                  The unique code provided with the certificate
                </p>
              </div>

              <div>
                <label htmlFor="pub-recipientAddress" className="block text-sm font-medium text-gray-300 text-left">
                  Recipient's Wallet Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="recipientAddress"
                    id="pub-recipientAddress"
                    placeholder="0x..."
                    className="mt-1 block w-full rounded-md bg-dark-300 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-3"
                    value={verificationForm.recipientAddress}
                    onChange={(e) => setVerificationForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400 text-left">
                  The Ethereum address of the certificate recipient
                </p>
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-300"
              >
                Verify Certificate
              </button>
            </form>

            {verificationResult && (
              <div className={`mt-6 p-6 rounded-lg ${
                verificationResult.isValid 
                  ? 'bg-green-900 bg-opacity-20 border border-green-700' 
                  : 'bg-red-900 bg-opacity-20 border border-red-700'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  {verificationResult.isValid ? (
                    <div className="rounded-full bg-green-900 bg-opacity-20 p-2">
                      <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="rounded-full bg-red-900 bg-opacity-20 p-2">
                      <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <p className={`text-lg font-medium ${
                  verificationResult.isValid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {verificationResult.message}
                </p>

                {verificationResult.isValid && verificationResult.certificate && (
                  <div className="mt-6 bg-dark-300 rounded-lg p-6 text-left">
                    <h4 className="text-lg font-medium text-white mb-4">Certificate Details</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-400">Certificate Type</dt>
                        <dd className="mt-1 text-sm text-white capitalize">{verificationResult.certificate.certificateType}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-400">Recipient</dt>
                        <dd className="mt-1 text-sm text-white">{verificationResult.certificate.recipientName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-400">Issue Date</dt>
                        <dd className="mt-1 text-sm text-white">
                          {new Date(verificationResult.certificate.issueDate).toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-400">Status</dt>
                        <dd className="mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            verificationResult.certificate.status === 'Valid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {verificationResult.certificate.status}
                          </span>
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-400">Description</dt>
                        <dd className="mt-1 text-sm text-white">{verificationResult.certificate.description}</dd>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sample Verification Codes */}
          <div className="mt-8 text-left">
            <h4 className="text-lg font-medium text-white mb-4">Sample Verification Codes</h4>
            <div className="bg-dark-400 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-300">Membership Certificate:</p>
                <p className="text-sm font-mono text-white">DAO-MEM-2024-001</p>
                <p className="text-xs text-gray-400">Address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Achievement Certificate:</p>
                <p className="text-sm font-mono text-white">DAO-ACH-2024-001</p>
                <p className="text-xs text-gray-400">Address: 0x9876543210abcdef9876543210abcdef98765432</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Contribution Certificate:</p>
                <p className="text-sm font-mono text-white">DAO-CON-2024-001</p>
                <p className="text-xs text-gray-400">Address: 0xfedc...ba98</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Proposals Section Component
  const ProposalsSection = () => (
    <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-lg font-medium leading-6 text-white">Proposals</h3>
            <p className="mt-2 text-sm text-gray-400">
              A list of all active and past proposals in the DAO.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
            <button
              type="button"
              onClick={() => setShowProposalDetailsModal(true)}
              className="inline-flex items-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => setShowProposalModal(true)}
              className="inline-flex items-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
            >
              Create Proposal
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-dark-100 sm:rounded-lg">
                <table className="min-w-full divide-y divide-dark-100">
                  <thead className="bg-dark-400">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Proposer
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Votes
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 bg-dark-300">
                    {proposals.map((proposal) => (
                      <tr key={proposal.id} className="hover:bg-dark-400">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                          #{proposal.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {proposal.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {proposal.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {proposal.creator}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            proposal.state === 1 
                              ? 'bg-green-100 text-green-800'
                              : proposal.state === 7
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {proposal.state === 1 ? 'Active' : proposal.state === 7 ? 'Executed' : 'Defeated'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">{proposal.votesFor}</span>
                            <span className="text-gray-500">/</span>
                            <span className="text-red-400">{proposal.votesAgainst}</span>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {renderActionButton(proposal)}
                        </td>
                      </tr>
                    ))}
                    {proposals.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-gray-400">
                          No proposals created yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Vote Section Component
  const VoteSection = () => {
    const activeProposals = proposals.filter(p => p.state === 1)

    return (
      <div className="space-y-8">
        <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-lg font-medium leading-6 text-white">Active Votes</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Cast your vote on active proposals
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  {activeProposals.length > 0 ? (
                    <div className="overflow-hidden shadow ring-1 ring-dark-100 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-dark-100">
                        <thead className="bg-dark-400">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                              Proposal
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Type
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Current Votes
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Time Remaining
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-100 bg-dark-300">
                          {activeProposals.map((proposal) => {
                            const timeRemaining = getTimeRemaining(proposal.endDate)
                            return (
                              <tr key={proposal.id} className="hover:bg-dark-400">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex flex-col">
                                    <div className="font-medium text-white">#{proposal.id} {proposal.title}</div>
                                    <div className="text-gray-400 text-xs mt-1">{proposal.description.slice(0, 100)}...</div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  {proposal.type}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                      <span className="text-green-400">{proposal.votesFor}</span>
                                      <ArrowUpIcon className="h-4 w-4 text-green-400 ml-1" />
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-red-400">{proposal.votesAgainst}</span>
                                      <ArrowDownIcon className="h-4 w-4 text-red-400 ml-1" />
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  {timeRemaining.isExpired ? (
                                    <span className="text-red-400">Expired</span>
                                  ) : (
                                    <div className="flex flex-col">
                                      <div className="text-accent-purple">
                                        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                                      </div>
                                      <div className="text-xs text-gray-400 mt-1">
                                        Ends {new Date(proposal.endDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                  )}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <button
                                    onClick={() => {
                                      setSelectedProposal(proposal);
                                      setShowVoteModal(true);
                                    }}
                                    className="text-accent-purple hover:text-accent-blue"
                                    disabled={timeRemaining.isExpired}
                                  >
                                    Cast Vote<span className="sr-only">, {proposal.title}</span>
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HandRaisedIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-white">No active proposals</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        There are currently no proposals available for voting.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voting History Section */}
        <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-lg font-medium leading-6 text-white">Voting History</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Your previous votes and their outcomes
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  {votingHistory.length > 0 ? (
                    <div className="overflow-hidden shadow ring-1 ring-dark-100 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-dark-100">
                        <thead className="bg-dark-400">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                              Proposal
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Your Vote
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Reason
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-100 bg-dark-300">
                          {votingHistory.map((vote) => (
                            <tr key={`${vote.proposalId}-${vote.timestamp}`} className="hover:bg-dark-400">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="font-medium text-white">#{vote.proposalId} {vote.proposalTitle}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  vote.vote ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {vote.vote ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {vote.reason}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {new Date(vote.timestamp).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-white">No voting history</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        You haven't voted on any proposals yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Add time remaining utility function
  const getTimeRemaining = (endDate) => {
    const total = new Date(endDate) - new Date()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))

    return {
      total,
      days,
      hours,
      minutes,
      isExpired: total <= 0
    }
  }

  const handleCertificateSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would typically interact with your smart contract
      const newCertificate = {
        id: certificates.length + 1,
        ...certificateForm,
        issueDate: new Date().toISOString(),
        status: 'Valid',
        issuer: 'DAO Admin', // Replace with actual connected wallet address
      }
      
      setCertificates(prev => [...prev, newCertificate])
      setShowCertificateModal(false)
      setCertificateForm({
        recipientName: '',
        recipientAddress: '',
        certificateType: 'membership',
        description: ''
      })
    } catch (error) {
      console.error('Error issuing certificate:', error)
    }
  }

  const handleVerification = (e) => {
    e.preventDefault()
    const { verificationCode, recipientAddress } = verificationForm
    
    // Find certificate in the existing certificates array
    const certificate = certificates.find(cert => cert.verificationCode === verificationCode)
    
    if (certificate && certificate.recipientAddress.toLowerCase() === recipientAddress.toLowerCase()) {
      setVerificationResult({
        isValid: true,
        message: 'Certificate successfully verified!',
        certificate
      })
    } else {
      setVerificationResult({
        isValid: false,
        message: certificate 
          ? 'Invalid recipient address for this certificate.'
          : 'Certificate not found. Please check the verification code.',
        certificate: null
      })
    }
  }

  // Voting function
  const handleVote = async (proposalId) => {
    try {
      const support = voteForm.support ? 1 : 0; // 1 for Yes, 0 for No
      const reason = voteForm.reason;

      // Call the contract method
      const tx = await myGovernorContract.castVoteWithReason(
        proposalId,
        support,
        reason
      );
      await tx.wait();

      // Update local state
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            votesFor: support === 1 ? p.votesFor + 1 : p.votesFor,
            votesAgainst: support === 0 ? p.votesAgainst + 1 : p.votesAgainst
          }
        }
        return p;
      }));

      setShowVoteModal(false);
      setVoteForm({ support: true, reason: '' });
    } catch (error) {
      console.error('Error voting:', error);
    }
  }

  // Add queue and execute handlers
  const handleQueueProposal = async (proposal) => {
    try {
      // In a real implementation, this would call the smart contract
      setProposals(prevProposals =>
        prevProposals.map(p =>
          p.id === proposal.id
            ? { ...p, state: 5 }
            : p
        )
      )
    } catch (error) {
      console.error('Error queueing proposal:', error)
    }
  }

  const handleExecuteProposal = async (proposal) => {
    try {
      // In a real implementation, this would call the smart contract
      setProposals(prevProposals =>
        prevProposals.map(p =>
          p.id === proposal.id
            ? { ...p, state: 7 }
            : p
        )
      )
    } catch (error) {
      console.error('Error executing proposal:', error)
    }
  }

  // Add action buttons based on proposal state
  const renderActionButton = (proposal) => {
    const timeRemaining = getTimeRemaining(proposal.endDate)
    
    switch (proposal.state) {
      case 1:
        return (
          <button
            onClick={() => {
              setSelectedProposal(proposal)
              setShowVoteModal(true)
            }}
            className="text-accent-purple hover:text-accent-blue"
            disabled={timeRemaining.isExpired}
          >
            Cast Vote<span className="sr-only">, {proposal.title}</span>
          </button>
        )
      case 4:
        return (
          <button
            onClick={() => handleQueueProposal(proposal)}
            className="text-green-400 hover:text-green-500"
          >
            Queue<span className="sr-only">, {proposal.title}</span>
          </button>
        )
      case 5:
        return (
          <button
            onClick={() => handleExecuteProposal(proposal)}
            className="text-blue-400 hover:text-blue-500"
          >
            Execute<span className="sr-only">, {proposal.title}</span>
          </button>
        )
      default:
        return null
    }
  }

  // Verification Modal Component
  const VerificationModal = () => (
    <Transition.Root show={showVerificationModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowVerificationModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                      Verify Certificate
                    </Dialog.Title>
                    <form onSubmit={handleVerification} className="mt-2">
                      <div className="space-y-4">
                        <div className="text-left">
                          <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            name="verificationCode"
                            id="verificationCode"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={verificationForm.verificationCode}
                            onChange={(e) => setVerificationForm(prev => ({ ...prev, verificationCode: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="text-left">
                          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-300">
                            Recipient Wallet Address
                          </label>
                          <input
                            type="text"
                            name="recipientAddress"
                            id="recipientAddress"
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={verificationForm.recipientAddress}
                            onChange={(e) => setVerificationForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                        >
                          Verify
                        </button>
                      </div>
                    </form>

                    {verificationResult && (
                      <div className={`mt-4 p-4 rounded-lg ${
                        verificationResult.isValid 
                          ? 'bg-green-900 bg-opacity-20 border border-green-700' 
                          : 'bg-red-900 bg-opacity-20 border border-red-700'
                      }`}>
                        <p className={`text-sm ${
                          verificationResult.isValid ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {verificationResult.message}
                        </p>
                        {verificationResult.isValid && verificationResult.certificate && (
                          <div className="mt-4 text-left">
                            <h4 className="text-white font-medium mb-2">Certificate Details:</h4>
                            <div className="space-y-2 text-sm">
                              <p className="text-gray-300">Type: <span className="text-white capitalize">{verificationResult.certificate.certificateType}</span></p>
                              <p className="text-gray-300">Recipient: <span className="text-white">{verificationResult.certificate.recipientName}</span></p>
                              <p className="text-gray-300">Issue Date: <span className="text-white">{new Date(verificationResult.certificate.issueDate).toLocaleDateString()}</span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-dark-200"
                    onClick={() => {
                      setShowVerificationModal(false)
                      setVerificationResult(null)
                      setVerificationForm({ verificationCode: '', recipientAddress: '' })
                    }}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Vote Modal Component
  const VoteModal = () => (
    <Transition.Root show={showVoteModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowVoteModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-4">
                      Cast Your Vote
                    </Dialog.Title>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleVote(selectedProposal.id);
                    }} className="mt-2">
                      <div className="space-y-4">
                        <div className="flex justify-center space-x-4">
                          <button
                            type="button"
                            onClick={() => setVoteForm(prev => ({ ...prev, support: true }))}
                            className={`px-4 py-2 rounded-md ${
                              voteForm.support
                                ? 'bg-green-500 text-white'
                                : 'bg-dark-400 text-gray-300'
                            }`}
                          >
                            Vote Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setVoteForm(prev => ({ ...prev, support: false }))}
                            className={`px-4 py-2 rounded-md ${
                              !voteForm.support
                                ? 'bg-red-500 text-white'
                                : 'bg-dark-400 text-gray-300'
                            }`}
                          >
                            Vote No
                          </button>
                        </div>
                        <div className="text-left">
                          <label htmlFor="reason" className="block text-sm font-medium text-gray-300">
                            Reason (Optional)
                          </label>
                          <textarea
                            name="reason"
                            id="reason"
                            rows={3}
                            className="mt-1 block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                            value={voteForm.reason}
                            onChange={(e) => setVoteForm(prev => ({ ...prev, reason: e.target.value }))}
                            placeholder="Why are you voting this way?"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-dark-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-200"
                          onClick={() => setShowVoteModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue"
                        >
                          Submit Vote
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Members Section Component
  const MembersSection = () => (
    <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-lg font-medium leading-6 text-white">Members</h3>
            <p className="mt-2 text-sm text-gray-400">
              A list of all members in the DAO with their roles and activities.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
            >
              Add Member
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-dark-100 sm:rounded-lg">
                <table className="min-w-full divide-y divide-dark-100">
                  <thead className="bg-dark-400">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                        Member
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Role
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Voting Power
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Activity
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 bg-dark-300">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-dark-400">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-white">{member.name}</div>
                              <div className="text-gray-400 font-mono text-xs">{member.walletAddress.slice(0, 6)}...{member.walletAddress.slice(-4)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.role === 'Admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : member.role === 'Moderator'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <div className="h-2 w-16 bg-dark-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
                                style={{ width: `${(member.votingPower / 1000) * 100}%` }}
                              />
                            </div>
                            <span className="ml-2 text-gray-300">{member.votingPower}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-400">Proposals:</span>
                              <span className="text-white">{member.proposalsCreated}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-400">Votes:</span>
                              <span className="text-white">{member.proposalsVoted}</span>
                            </div>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              // Handle view member details
                            }}
                            className="text-accent-blue hover:text-accent-purple"
                          >
                            View<span className="sr-only">, {member.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Proposal state utilities
  const ProposalState = {
    Pending: 0,
    Active: 1,
    Canceled: 2,
    Defeated: 3,
    Succeeded: 4,
    Queued: 5,
    Expired: 6,
    Executed: 7
  }

  const getProposalStateColor = (state) => {
    switch (state) {
      case ProposalState.Pending:
        return 'bg-yellow-100 text-yellow-800'
      case ProposalState.Active:
        return 'bg-green-100 text-green-800'
      case ProposalState.Canceled:
        return 'bg-gray-100 text-gray-800'
      case ProposalState.Defeated:
        return 'bg-red-100 text-red-800'
      case ProposalState.Succeeded:
        return 'bg-blue-100 text-blue-800'
      case ProposalState.Queued:
        return 'bg-purple-100 text-purple-800'
      case ProposalState.Expired:
        return 'bg-orange-100 text-orange-800'
      case ProposalState.Executed:
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProposalStateLabel = (state) => {
    switch (state) {
      case ProposalState.Pending:
        return 'Pending'
      case ProposalState.Active:
        return 'Active'
      case ProposalState.Canceled:
        return 'Canceled'
      case ProposalState.Defeated:
        return 'Defeated'
      case ProposalState.Succeeded:
        return 'Succeeded'
      case ProposalState.Queued:
        return 'Queued'
      case ProposalState.Expired:
        return 'Expired'
      case ProposalState.Executed:
        return 'Executed'
      default:
        return 'Unknown'
    }
  }

  // Handle token minting
  const handleMintTokens = async (e) => {
    e.preventDefault()
    try {
      // In a real implementation, this would call the smart contract
      console.log('Minting tokens:', mintForm)
      // Update total supply and recipient balance
      setTokenBalance(prev => (parseInt(prev) + parseInt(mintForm.amount)).toString())
      setShowMintModal(false)
      setMintForm({ recipientAddress: '', amount: '' })
    } catch (error) {
      console.error('Error minting tokens:', error)
    }
  }

  // Mint Modal Component
  const MintModal = () => (
    <Transition.Root show={showMintModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowMintModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark-200">
                    <CurrencyDollarIcon className="h-6 w-6 text-accent-purple" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                      Mint DAO Tokens
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        Enter the recipient address and amount of tokens to mint. This action can only be performed by admin.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleMintTokens} className="mt-5 sm:mt-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="recipientAddress" className="block text-sm font-medium text-white">
                        Recipient Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="recipientAddress"
                          id="recipientAddress"
                          className="block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                          placeholder="0x..."
                          value={mintForm.recipientAddress}
                          onChange={(e) => setMintForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-white">
                        Amount
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          className="block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                          placeholder="100"
                          value={mintForm.amount}
                          onChange={(e) => setMintForm(prev => ({ ...prev, amount: e.target.value }))}
                          min="1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent-purple px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-accent-purple-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:col-start-2 sm:text-sm"
                    >
                      Mint Tokens
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-dark-100 bg-dark-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setShowMintModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  // Add delegation functionality
  const handleDelegate = async (e) => {
    e.preventDefault()
    try {
      // In a real implementation, this would call the smart contract's delegate function
      const delegateAddress = delegateForm.delegateTo || account // Self-delegate if no address provided
      
      setVotingPower(tokenBalance)
      setIsDelegated(true)
      setShowDelegateModal(false)
      setDelegateForm({ delegateTo: '' })
      
      toast({
        title: 'Tokens Delegated',
        description: delegateAddress === account 
          ? 'Successfully self-delegated your tokens'
          : `Successfully delegated tokens to ${delegateAddress}`,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Delegation Failed',
        description: error.message,
        status: 'error'
      })
    }
  }

  // Delegate Modal Component
  const DelegateModal = () => (
    <Transition.Root show={showDelegateModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowDelegateModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-dark-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark-200">
                    <UserGroupIcon className="h-6 w-6 text-accent-purple" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                      Delegate Voting Power
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        Delegate your tokens to convert them into voting power. You can delegate to yourself or another address.
                        Leave the address field empty to self-delegate.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleDelegate} className="mt-5 sm:mt-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="delegateTo" className="block text-sm font-medium text-white">
                        Delegate To (Optional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="delegateTo"
                          id="delegateTo"
                          className="block w-full rounded-md bg-dark-400 border border-dark-100 text-white shadow-sm focus:border-accent-purple focus:ring-accent-purple sm:text-sm p-2"
                          placeholder="0x... (leave empty to self-delegate)"
                          value={delegateForm.delegateTo}
                          onChange={(e) => setDelegateForm(prev => ({ ...prev, delegateTo: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-400 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Available Tokens</span>
                        <span className="text-sm text-white">{tokenBalance}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400">Current Voting Power</span>
                        <span className="text-sm text-white">{votingPower}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent-purple px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-accent-purple-dark focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    >
                      Delegate Tokens
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-dark-100 bg-dark-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setShowDelegateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-200 to-dark-400">
      <MobileSidebar />
      <ProposalModal />
      <ProposalDetailsModal />
      <CertificateModal />
      <ViewCertificateModal />
      <VerificationModal />
      <VoteModal />
      <MintModal />
      <DelegateModal />
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-dark-300 overflow-y-auto border-r border-dark-100">
            <div className="flex flex-shrink-0 items-center px-4">
              <div className="h-8 w-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple text-transparent bg-clip-text">
                DAO Dashboard
              </h1>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item)
                    }}
                    className={classNames(
                      item.current
                        ? 'bg-dark-400 text-white'
                        : 'text-gray-300 hover:bg-dark-200 hover:text-white',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-150'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-accent-purple' : 'text-gray-400 group-hover:text-accent-blue',
                        'mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-dark-300 border-b border-dark-100">
            <button
              type="button"
              className="px-4 border-r border-dark-100 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <h2 className="text-2xl font-semibold text-white my-auto">
                  {navigation.find(item => item.current)?.name || 'Welcome to the DAO'}
                </h2>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <ConnectButton />
                {isAdmin && (
                  <button
                    onClick={() => setShowMintModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-300 shadow-lg"
                  >
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Mint Tokens
                  </button>
                )}
                <button
                  onClick={() => setShowDelegateModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-300 shadow-lg"
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  {isDelegated ? 'Change Delegation' : 'Delegate Tokens'}
                </button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-dark-300 overflow-hidden shadow-lg rounded-lg border border-dark-100 hover:border-accent-blue transition-colors duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ChartBarIcon className="h-6 w-6 text-accent-purple" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-400 truncate">Token Balance</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-white">{tokenBalance} GT</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-300 overflow-hidden shadow-lg rounded-lg border border-dark-100 hover:border-accent-purple transition-colors duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DocumentTextIcon className="h-6 w-6 text-accent-blue" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-400 truncate">Active Proposals</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-white">
                                {proposals.filter(p => p.state === 1).length}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-300 overflow-hidden shadow-lg rounded-lg border border-dark-100 hover:border-accent-blue transition-colors duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DocumentTextIcon className="h-6 w-6 text-accent-purple" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-400 truncate">Certificates Issued</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-white">{certificates.length}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proposals Section */}
                <div className="mt-8">
                  <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-white">Create New Proposal</h3>
                          <div className="mt-2 max-w-xl text-sm text-gray-400">
                            <p>Submit a new proposal for the DAO members to vote on.</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCreateProposal}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-purple hover:to-accent-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-300 shadow-lg"
                        >
                          <PlusIcon className="h-5 w-5 mr-2" />
                          Create Proposal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <div className="bg-dark-300 shadow-lg sm:rounded-lg border border-dark-100">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentProposals.map((proposal) => (
                          <div 
                            key={proposal.id} 
                            className="bg-dark-400 p-4 rounded-lg border border-dark-100 hover:border-accent-blue transition-all duration-300 cursor-pointer"
                            onClick={() => {
                              const proposalsNav = navigation.find(n => n.name === 'Proposals')
                              if (proposalsNav) handleNavClick(proposalsNav)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"></div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{proposal.title}</p>
                                  <p className="text-xs text-gray-400">{formatTimeAgo(proposal.startDate)}</p>
                                </div>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-purple bg-opacity-20 text-accent-purple">
                                {getProposalStateLabel(proposal.state)}
                              </span>
                            </div>
                          </div>
                        ))}
                        {recentProposals.length === 0 && (
                          <div className="text-center text-gray-400 py-4">
                            No recent proposals
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {navigation.find(nav => nav.name === 'Certificates').current && (
        <div className="space-y-8">
          <CertificatesSection />
          <PublicVerificationSection />
        </div>
      )}
      {navigation.find(nav => nav.name === 'Proposals').current && (
        <div className="space-y-8">
          <ProposalsSection />
        </div>
      )}
      {navigation.find(nav => nav.name === 'Vote').current && (
        <div className="space-y-8">
          <VoteSection />
        </div>
      )}
      {navigation.find(nav => nav.name === 'Members').current && (
        <div className="space-y-8">
          <MembersSection />
        </div>
      )}
    </div>
  )
}