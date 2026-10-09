# SM2G

A personal minimalist webpage.

## Install

Requires a recent Ruby (the macOS system Ruby is too old). On macOS:

```sh
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
gem install bundler
bundle install
```

## Startup
* Git clone
* Serve with `jekyll serve --host 0.0.0.0`
* Open http://localhost:4000

## Editing the content

All visible texts live in [`_data/content.yml`](_data/content.yml), with one entry per language (`fr`, `en`, `he`). Edit the file and push — no HTML to touch.

| To change | Edit |
|---|---|
| Texts, services, links, certifications | `_data/content.yml` |
| Resume | replace `cv.pdf` at the root of the repo |
| Certification badges | images in `assets/images/certs/` + the `certifications` list |
| Page title / meta description | `_config.yml` |
| Styles | `_includes/style.css` |
| Page structure | `index.html`, `_layouts/default.html` |

To add a language, add it to `languages` in `_data/content.yml` and add its key under each text.

## Disclaimer

Every **tips**, **code** and **scripts** provided here are just provided *as-is*, and are mainly used for me to quickly retrieve pieces of code that I wrote. I'm sharing this hoping it can be useful to other people as well. In the *infortunate* (and *unlikely*) event that one of the articles in this blog may crash your system or cause a data loss, I will not be held responsible for **your** actions.
