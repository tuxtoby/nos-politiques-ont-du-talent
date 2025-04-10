import { signInAnonymously } from '../services/authService';

export async function initializeAuth() {
  try {
    console.log('Initializing authentication...');
    const result = await signInAnonymously();
    
    if (result.success) {
      console.log('Anonymous authentication successful');
      return true;
    } else {
      console.error('Anonymous authentication failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error during authentication initialization:', error);
    return false;
  }
}
