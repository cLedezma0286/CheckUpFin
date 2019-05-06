'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">premier documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1b771be6fd23b7182151c491b60b5677"' : 'data-target="#xs-components-links-module-AppModule-1b771be6fd23b7182151c491b60b5677"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1b771be6fd23b7182151c491b60b5677"' :
                                            'id="xs-components-links-module-AppModule-1b771be6fd23b7182151c491b60b5677"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientFileModule.html" data-type="entity-link">ClientFileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClientFileModule-e3dd974a0db9cd5cb589431de4d1966c"' : 'data-target="#xs-components-links-module-ClientFileModule-e3dd974a0db9cd5cb589431de4d1966c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClientFileModule-e3dd974a0db9cd5cb589431de4d1966c"' :
                                            'id="xs-components-links-module-ClientFileModule-e3dd974a0db9cd5cb589431de4d1966c"' }>
                                            <li class="link">
                                                <a href="components/CalculationExplanationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalculationExplanationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientFileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientFileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditClientInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditClientInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinancialHealthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FinancialHealthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralClientInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralClientInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesAndAgreementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotesAndAgreementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectiveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectiveComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientFinancesModule.html" data-type="entity-link">ClientFinancesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClientFinancesModule-3152a47b7d44116513df518191f7f96e"' : 'data-target="#xs-components-links-module-ClientFinancesModule-3152a47b7d44116513df518191f7f96e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClientFinancesModule-3152a47b7d44116513df518191f7f96e"' :
                                            'id="xs-components-links-module-ClientFinancesModule-3152a47b7d44116513df518191f7f96e"' }>
                                            <li class="link">
                                                <a href="components/ClientFinancesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientFinancesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientSearchModule.html" data-type="entity-link">ClientSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClientSearchModule-8a3ebe2bd371f29a722dfbd608d9181b"' : 'data-target="#xs-components-links-module-ClientSearchModule-8a3ebe2bd371f29a722dfbd608d9181b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClientSearchModule-8a3ebe2bd371f29a722dfbd608d9181b"' :
                                            'id="xs-components-links-module-ClientSearchModule-8a3ebe2bd371f29a722dfbd608d9181b"' }>
                                            <li class="link">
                                                <a href="components/ClientSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-72dba37e6083f1a6a985a676ada12615"' : 'data-target="#xs-components-links-module-HomeModule-72dba37e6083f1a6a985a676ada12615"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-72dba37e6083f1a6a985a676ada12615"' :
                                            'id="xs-components-links-module-HomeModule-72dba37e6083f1a6a985a676ada12615"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterviewModule.html" data-type="entity-link">InterviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InterviewModule-7545c0277840188711c2d5c46385ed1d"' : 'data-target="#xs-components-links-module-InterviewModule-7545c0277840188711c2d5c46385ed1d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InterviewModule-7545c0277840188711c2d5c46385ed1d"' :
                                            'id="xs-components-links-module-InterviewModule-7545c0277840188711c2d5c46385ed1d"' }>
                                            <li class="link">
                                                <a href="components/AddNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddNotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddObjectiveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddObjectiveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InterviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InterviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoaderModule.html" data-type="entity-link">LoaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoaderModule-15f3b2f5ed20729d8afd0b8db7ce033f"' : 'data-target="#xs-components-links-module-LoaderModule-15f3b2f5ed20729d8afd0b8db7ce033f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoaderModule-15f3b2f5ed20729d8afd0b8db7ce033f"' :
                                            'id="xs-components-links-module-LoaderModule-15f3b2f5ed20729d8afd0b8db7ce033f"' }>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NextCheckupModule.html" data-type="entity-link">NextCheckupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NextCheckupModule-9b44eaa2f32d818f730794b59da42e52"' : 'data-target="#xs-components-links-module-NextCheckupModule-9b44eaa2f32d818f730794b59da42e52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NextCheckupModule-9b44eaa2f32d818f730794b59da42e52"' :
                                            'id="xs-components-links-module-NextCheckupModule-9b44eaa2f32d818f730794b59da42e52"' }>
                                            <li class="link">
                                                <a href="components/NextCheckupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NextCheckupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link">ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductsModule-db118347a510a3299a67c9962867b54f"' : 'data-target="#xs-components-links-module-ProductsModule-db118347a510a3299a67c9962867b54f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductsModule-db118347a510a3299a67c9962867b54f"' :
                                            'id="xs-components-links-module-ProductsModule-db118347a510a3299a67c9962867b54f"' }>
                                            <li class="link">
                                                <a href="components/ProductDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedComponentsModule.html" data-type="entity-link">SharedComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' : 'data-target="#xs-components-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' :
                                            'id="xs-components-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' }>
                                            <li class="link">
                                                <a href="components/ClientHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrintoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrintoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' : 'data-target="#xs-directives-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' :
                                        'id="xs-directives-links-module-SharedComponentsModule-7b52dd865d7c3e3c6f99024dc0707e53"' }>
                                        <li class="link">
                                            <a href="directives/DateValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/EmailValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/MaxValue.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaxValue</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NoSpecialChars.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoSpecialChars</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NotNumbersDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotNumbersDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RealEmailValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">RealEmailValidator</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Client.html" data-type="entity-link">Client</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinancialHealth.html" data-type="entity-link">FinancialHealth</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinancialHealthItem.html" data-type="entity-link">FinancialHealthItem</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ClientsService.html" data-type="entity-link">ClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeaderService.html" data-type="entity-link">HeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterviewService.html" data-type="entity-link">InterviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesAndsAgreementsService.html" data-type="entity-link">NotesAndsAgreementsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectivesService.html" data-type="entity-link">ObjectivesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link">ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionsService.html" data-type="entity-link">QuestionsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/GeneralInterceptor.html" data-type="entity-link">GeneralInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});