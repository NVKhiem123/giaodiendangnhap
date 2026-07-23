// Configuration for Firebase & Unified API Service

const firebaseConfig = {
    apiKey: "AIzaSyDemoKey_ReplaceWithYourActualFirebaseApiKey",
    authDomain: "cowcolap-app.firebaseapp.com",
    projectId: "cowcolap-app",
    storageBucket: "cowcolap-app.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Initialize Firebase App & Services
let app, auth, db;
let isFirebaseInitialized = false;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        isFirebaseInitialized = true;
        console.log("Firebase initialized successfully.");
    }
} catch (error) {
    console.warn("Firebase initialization notice:", error.message);
}

// Local Storage Database for Seamless Persistence & Offline Testing
class LocalDatabase {
    static getUsers() {
        const users = localStorage.getItem('cowcolap_users');
        return users ? JSON.parse(users) : {};
    }

    static getUser(email) {
        if (!email) return null;
        const users = this.getUsers();
        return users[email.toLowerCase()] || null;
    }

    static saveUser(email, userData) {
        const users = this.getUsers();
        users[email.toLowerCase()] = {
            ...userData,
            email: email.toLowerCase(),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('cowcolap_users', JSON.stringify(users));
        return users[email.toLowerCase()];
    }

    static setCurrentUser(user) {
        localStorage.setItem('cowcolap_current_user', JSON.stringify(user));
    }

    static getCurrentUser() {
        const user = localStorage.getItem('cowcolap_current_user');
        return user ? JSON.parse(user) : null;
    }

    static clearCurrentUser() {
        localStorage.removeItem('cowcolap_current_user');
    }
}

// Unified Auth & DB Service supporting Backend API, Firebase, and Local Persistence
const UserService = {
    // 1. REGISTER
    async register(email, password) {
        const cleanEmail = email.trim().toLowerCase();

        // Optional Express Backend call if available
        try {
            const resp = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password: password })
            });
            if (resp.ok) {
                const data = await resp.json();
                LocalDatabase.saveUser(cleanEmail, data.user);
                return data.user;
            } else {
                const errData = await resp.json();
                if (errData.error === 'Email already exists') {
                    throw new Error("Email already exists");
                }
            }
        } catch (backendErr) {
            if (backendErr.message === "Email already exists") throw backendErr;
        }

        // Firebase & Fallback Database Logic
        if (LocalDatabase.getUser(cleanEmail)) {
            throw new Error("Email already exists");
        }

        let uid = 'user_' + Date.now();

        if (isFirebaseInitialized && firebaseConfig.apiKey !== "AIzaSyDemoKey_ReplaceWithYourActualFirebaseApiKey") {
            try {
                const userCredential = await auth.createUserWithEmailAndPassword(cleanEmail, password);
                uid = userCredential.user.uid;
            } catch (err) {
                if (err.code === 'auth/email-already-in-use') throw new Error("Email already exists");
                if (err.code === 'auth/invalid-email') throw new Error("Invalid Email");
                if (err.code === 'auth/weak-password') throw new Error("Password is too weak");
            }
        }

        const namePart = cleanEmail.split('@')[0];
        const defaultProfile = {
            uid: uid,
            email: cleanEmail,
            password: password,
            firstName: namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : "Nguyễn Văn",
            lastName: "A",
            phone: "+84 90 123 4567",
            address: "Tòa nhà CowColap, Cơ sở 1 PTIT, TP. Hồ Chí Minh",
            isVerified: true,
            createdAt: new Date().toISOString()
        };

        if (isFirebaseInitialized && firebaseConfig.apiKey !== "AIzaSyDemoKey_ReplaceWithYourActualFirebaseApiKey") {
            try {
                await db.collection('users').doc(uid).set({
                    email: cleanEmail,
                    firstName: defaultProfile.firstName,
                    lastName: defaultProfile.lastName,
                    phone: defaultProfile.phone,
                    address: defaultProfile.address,
                    isVerified: true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (err) {
                console.warn("Firestore write notice:", err);
            }
        }

        LocalDatabase.saveUser(cleanEmail, defaultProfile);
        return defaultProfile;
    },

    // 2. LOGIN
    async login(email, password) {
        const cleanEmail = email.trim().toLowerCase();

        try {
            const resp = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password: password })
            });
            if (resp.ok) {
                const data = await resp.json();
                LocalDatabase.setCurrentUser(data.user);
                return data.user;
            }
        } catch (backendErr) {
            console.warn("Express backend offline, falling back to Firebase/Local:", backendErr);
        }

        if (isFirebaseInitialized && firebaseConfig.apiKey !== "AIzaSyDemoKey_ReplaceWithYourActualFirebaseApiKey") {
            try {
                const userCredential = await auth.signInWithEmailAndPassword(cleanEmail, password);
                const uid = userCredential.user.uid;
                const doc = await db.collection('users').doc(uid).get();
                let profile = doc.exists ? doc.data() : null;

                if (!profile) profile = LocalDatabase.getUser(cleanEmail);
                if (!profile) {
                    profile = {
                        uid: uid,
                        email: cleanEmail,
                        firstName: cleanEmail.split('@')[0],
                        lastName: "A",
                        phone: "+84 90 123 4567",
                        address: "Tòa nhà CowColap, Cơ sở 1 PTIT, TP. Hồ Chí Minh",
                        isVerified: true
                    };
                }

                LocalDatabase.setCurrentUser(profile);
                return profile;
            } catch (err) {
                if (err.code === 'auth/user-not-found') throw new Error("Invalid Email");
                if (err.code === 'auth/wrong-password') throw new Error("Incorrect password");
            }
        }

        const user = LocalDatabase.getUser(cleanEmail);
        if (!user) throw new Error("Email does not exist");
        if (user.password !== password) throw new Error("Incorrect password");

        LocalDatabase.setCurrentUser(user);
        return user;
    },

    // 3. UPDATE PROFILE
    async updateProfile(email, updatedFields) {
        const cleanEmail = email.trim().toLowerCase();

        try {
            const resp = await fetch('http://localhost:5000/api/profile/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, ...updatedFields })
            });
            if (resp.ok) {
                const data = await resp.json();
                LocalDatabase.saveUser(cleanEmail, data.user);
                LocalDatabase.setCurrentUser(data.user);
                return data.user;
            }
        } catch (backendErr) {
            console.warn("Backend API update fallback:", backendErr);
        }

        const existingUser = LocalDatabase.getUser(cleanEmail) || LocalDatabase.getCurrentUser();
        if (!existingUser) throw new Error("User session not found");

        const newProfileData = { ...existingUser, ...updatedFields };

        if (isFirebaseInitialized && firebaseConfig.apiKey !== "AIzaSyDemoKey_ReplaceWithYourActualFirebaseApiKey" && auth.currentUser) {
            try {
                await db.collection('users').doc(auth.currentUser.uid).update({
                    firstName: updatedFields.firstName,
                    lastName: updatedFields.lastName,
                    phone: updatedFields.phone,
                    address: updatedFields.address,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (err) {
                console.warn("Firebase profile update notice:", err.message);
            }
        }

        LocalDatabase.saveUser(cleanEmail, newProfileData);
        LocalDatabase.setCurrentUser(newProfileData);
        return newProfileData;
    },

    // 4. GET CURRENT USER
    getCurrentUser() {
        return LocalDatabase.getCurrentUser();
    },

    // 5. LOGOUT
    async logout() {
        if (isFirebaseInitialized && auth && auth.currentUser) {
            try {
                await auth.signOut();
            } catch (e) {
                console.warn("Firebase signout notice", e);
            }
        }
        LocalDatabase.clearCurrentUser();
    }
};
