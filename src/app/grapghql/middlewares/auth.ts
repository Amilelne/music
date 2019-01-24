import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';
import { AuthService } from 'app/core/auth/auth.service';

function createAuthLink() {
  // authenticate link
  const authLink = setContext((operation: GraphQLRequest, forward) => {
    const token = AuthService.getToken();
    if (!token) {
      return {};
    } else {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
  });
  return authLink;
}

export { createAuthLink };
