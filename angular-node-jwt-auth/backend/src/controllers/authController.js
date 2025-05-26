exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Here you would typically fetch the user from the database
    // For demonstration, let's assume we have a user object
    const user = { username: 'testuser', password: 'testpassword' }; // Replace with database call

    // Check if the user exists and the password is correct
    if (username === user.username && password === user.password) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};