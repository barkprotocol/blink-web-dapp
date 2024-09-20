function SubscriptionSection() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubscribe = (e) => {
      e.preventDefault();
      if (email) {
        setMessage(`Thank you for subscribing with ${email}!`);
        setEmail('');
      } else {
        setMessage('Please enter a valid email address.');
      }
    };
  
    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 mb-4 sm:mb-0 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
            />
            <Button type="submit" className="h-12 bg-gray-100 hover:bg-gray-700 text-gray-900 px-6 rounded-md flex-shrink-0 transition duration-200 ease-in-out">
              Subscribe
            </Button>
          </form>
          {message && (
            <p className="mt-4 text-lg text-green-400">{message}</p>
          )}
        </div>
      </section>
    );
  }
  