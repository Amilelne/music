import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { uploadLink, createAuthLink } from './middlewares';

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo) {
    const authLink = createAuthLink();
    apollo.create({
      link: from([authLink, uploadLink]),
      cache: new InMemoryCache()
    });
  }
}
