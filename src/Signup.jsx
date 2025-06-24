function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // State for messages
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Save credentials to localStorage (demo only - highly insecure for production!)
    localStorage.setItem('signupUsername', username);
    localStorage.setItem('signupPassword', password);

    setMessage({ text: 'Signup successful! Now please sign in.', type: 'success' });
    // Navigate after a short delay to allow message to be seen
    setTimeout(() => {
      navigate('/signin');
    }, 1000); // 1 second delay
  };

  // Clear message after a few seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000); // Clear message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

        {/* Message Display Area */}
        {message.text && (
          <div
            className={`p-3 rounded-md text-center text-sm font-medium ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Username Input */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          required
        />
        {/* Password Input with Toggle */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} // Dynamically set type based on showPassword state
            name="password"
            placeholder="Password"
            autoComplete="new-password" // Enables browser autofill for new passwords
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 w-full pr-10" // Add padding right for eye icon
            required
          />
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {/* Eye Icon SVG */}
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414L5.293 7A7.002 7.002 0 003 10a7.002 7.002 0 0011.002 5.099l2.295 2.295a1 1 0 001.414-1.414L17 15l-2.293-2.293-1.414-1.414-1.414-1.414L9 5.293 7 3.293 3.707 2.293zM7 10a3 3 0 007.447 2.01l-1.554-1.554A1 1 0 0112 10a1 1 0 01-1-1v-.01L9.01 7.553A3 3 0 007 10z" clipRule="evenodd" />
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="p-3 text-lg font-semibold bg-blue-600 text-white rounded-md cursor-pointer
                     hover:bg-blue-700 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                     shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}