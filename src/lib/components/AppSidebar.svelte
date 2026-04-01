<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { NavTree } from "$lib/nav.server.js";
  import type { ComponentProps } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "@lucide/svelte";

  let {
    nav,
    ...restProps
  }: { nav: NavTree } & ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
  <Sidebar.Header>
    <a href="/" class="text-2xl font-bold leading-tight text-center my-4">
      FPA Docs</a
    >
  </Sidebar.Header>

  <Sidebar.Content>
    {#each nav as section (section.title)}
      <Sidebar.Group>
        <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each section.pages as navPage (navPage.href)}
              {@const isActive = page.url.pathname === navPage.href}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg" {isActive}>
                  {#snippet child({ props })}
                    <a class="py-4 px-2" href={navPage.href} {...props}>
                      {navPage.title}
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    {/each}
  </Sidebar.Content>
  <Sidebar.Footer>
    <div class="flex flex-col gap-2">
      <Button size="lg" href="https://events.freestyledisc.org">
        <ExternalLink />Event Calendar
      </Button>
      <Button size="lg" href="https://www.freestyledisc.org">
        <ExternalLink />FPA Site
      </Button>
    </div>
  </Sidebar.Footer>
</Sidebar.Root>
