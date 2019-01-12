import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AuthService } from './core/auth/auth.service';

const uri = 'http://localhost:4455/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  // http link
  const http = httpLink.create({ uri });
  // authenticate link
  const auth = setContext(() => {
    const token = AuthService.getToken();
    if (!token) {
      return {};
    } else {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
  });
  return {
    link: auth.concat(http),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
