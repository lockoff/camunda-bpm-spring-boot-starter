package org.camunda.bpm.spring.boot.starter.webapp;

import org.camunda.bpm.spring.boot.starter.CamundaBpmAutoConfiguration;
import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.camunda.bpm.spring.boot.starter.webapp.filter.ResourceLoaderDependingFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@Configuration
@ConditionalOnWebApplication
@EnableConfigurationProperties({ CamundaBpmWebappProperties.class })
@AutoConfigureAfter(CamundaBpmAutoConfiguration.class)
public class CamundaBpmWebappAutoConfiguration extends WebMvcAutoConfigurationAdapter {

  @Autowired
  private ResourceLoader resourceLoader;

  @Autowired
  private CamundaBpmWebappProperties camundaBpmWebappProperties;

  @Bean
  public CamundaBpmWebappInitializer camundaBpmWebappInitializer() {
    return new CamundaBpmWebappInitializer();
  }

  @Bean(name = "resourceLoaderDependingInitHook")
  public InitHook<ResourceLoaderDependingFilter> resourceLoaderDependingInitHook() {
    return new InitHook<ResourceLoaderDependingFilter>() {

      @Override
      public void init(ResourceLoaderDependingFilter filter) {
        filter.setResourceLoader(resourceLoader);
      }
    };
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:/");
    super.addResourceHandlers(registry);
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    if (camundaBpmWebappProperties.isIndexRedirectEnabled()) {
      registry.addViewController("/").setViewName("index.html");
    }
    super.addViewControllers(registry);
  }

}
