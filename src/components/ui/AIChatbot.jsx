const FREE_AI_APIS = {
  HUGGINGFACE: 'huggingface', 
  GROQ: 'groq', 
  TOGETHER: 'together' 
}

export default function AIChatbot() {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Rajif's AI assistant. I can answer questions about his skills, projects, experience, and more. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiProvider, setApiProvider] = useState(FREE_AI_APIS.GROQ)
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
