# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'sphinx-doc'
copyright = '2023, Maillard'
author = 'Maillard'
release = '1.0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx_rtd_theme',
    'sphinxcontrib.drawio',
    "sphinxcontrib.youtube",
    'sphinxcontrib.plantuml',
    'sphinxcontrib.exceltable',
    'sphinxcontrib.xlsxtable',
    'sphinxcontrib.confluencebuilder',
    'matplotlib.sphinxext.plot_directive',

] #souvent package python propeties => html, latex, confluence, ..., plantuml

templates_path = ['_templates']
exclude_patterns = ['./source/_static/references/_sphinx.rst']

language = 'fr'

# https://sphinx-rtd-theme.readthedocs.io/en/stable/configuring.html
html_theme_options = {
#    'analytics_id': 'G-XXXXXXXXXX',  #  If specified, Google Analytics’ gtag.js is included in your pages. Set the value to the ID provided to you by google (like UA-XXXXXXX or G-XXXXXXXXXX).
#    'analytics_anonymize_ip': False,  Anonymize visitor IP addresses in Google Analytics.
    'logo_only': False, #Only display the logo image, do not display the project name at the top of the sidebar
    'display_version': True, # If True, the version number is shown at the top of the sidebar.
    'prev_next_buttons_location': 'top', # Location to display Next and Previous buttons. This can be either bottom, top, both , or None
    'style_external_links': True, # Add an icon next to external links.
    'vcs_pageview_mode': '', #Changes how to view files when using display_github, display_gitlab, etc. When using GitHub or GitLab this can be: blob (default), edit, or raw. On Bitbucket, this can be either: view (default) or edit
    'style_nav_header_background': '#2980B9', #Changes the background of the search area in the navigation bar. The value can be anything valid in a CSS background property.
    # Toc options
    'collapse_navigation': True, # With this enabled, navigation entries are not expandable – the [+] icons next to each entry are removed.
    'sticky_navigation': True, # Scroll the navigation with the main page content as you scroll the page.
    'navigation_depth': 4, # The maximum depth of the table of contents tree. Set this to -1 to allow unlimited depth.
    'includehidden': True, # Specifies if the navigation includes hidden table(s) of contents – that is, any toctree directive that is marked with the :hidden: option.
    'titles_only': False, # When enabled, page subheadings are not included in the navigation.
#    'body_max_width': '125%',
}
html_context = { #faire pour github
    "display_github": True, # Integrate Gitlab
    'github_host': 'github.com',
    "github_user": "MaillardCorentin", # Username
    "github_repo": "sphinx-doc", # Repo name
    "github_version": "main/", # Version
    "conf_py_path": "source/", # Path in the checkout to the docs root
    "current_version": release, # tell the theme which version we're currently on ('current_version' affects
    "version": release,
}
# Set the value of html_baseurl in your Sphinx conf.py to the current base URL of your documentation.
html_baseurl = 'https://github.com/MaillardCorentin/sphinx-doc'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

# CSS customization
def setup(app):
    app.add_css_file('css/custom.css')

# drawio

# drawio_headless = True
# drawio_builder_export_format = "png"
# drawio_disable_verbose_electron = True
drawio_no_sandbox = True

# -- Option for Latex output ---------------------------------------------------

# create a custom sphinx output for the youtube and vimeo video
youtube_cmd = (
    r"\newcommand{\sphinxcontribyoutube}[3]"
    r"{\begin{figure}\sphinxincludegraphics{{#2}.jpg}\caption{\url{#1#2#3}}\end{figure}}"
    "\n"
)

latex_elements = {"preamble": youtube_cmd}

# -- Options for plantuml output ----------------------------------------------
#
plantuml = 'java -jar ../_static/libraries/plantuml-1.2023.5.jar'
plantuml_output_format = 'png'
plantuml_latex_output_format = 'png'

# -- Options for CONFLUENCE output ----------------------------------------------
# https://sphinxcontrib-confluencebuilder.readthedocs.io/en/stable/configuration/
confluence_publish = True
confluence_space_key = 'ECAM'
confluence_parent_page = 'Week 01 [2023/04/03-2023/04/07]'
# confluence_parent_page_id_check = '1605913'
# (for Confluence Cloud)
confluence_server_url = 'https://corentinmaillard.atlassian.net/wiki/'
confluence_server_user = 'Corentin.Maillard@gmail.com'
confluence_server_pass = 'ATATT3xFfGF0KmX0AC9ASpIu8gvA3Lg3S6lGzKwENipag9kEux530A3zK16nc0LgCWBavOF8uES_gI1ijg60zvNelTjP5MxX0Sy4h2cSVJtjsHacztlH7Ki5coJK990kISJo1JggcKf5dKTLIcw22gky6c5Ccx4yQvp9jGrzHIJJ8GopjeF0I5g=0F575557'
confluence_ask_password = False
confluence_page_hierarchy = True
confluence_use_index = True
confluence_add_secnumbers = True
confluence_include_search = True
confluence_prev_next_buttons_location = 'top'
confluence_global_labels = [
    'GITHUB',
    'DOCKER',
    'RESTRUCTUREDTEXT'
    'SPHINX-DOC',
    'RUNNER',
    'CI/CD'
]
confluence_root_homepage = False
confluence_sourcelink = {
#    'type': 'github',
    'base':  'https://github.com',
    'url':'{base}/{owner}/{repo}/{view}/{version}/{page}{suffix}',
    'owner': 'MaillardCorentin',
    'repo': 'sphinx-doc',
    'container': '',
    'version': 'main/source',
    'view': 'blob',
    'protocol': 'https',
}
confluence_watch = True
confluence_publish_onlynew = False
confluence_page_generation_notice = True
confluence_cleanup_from_root = False
# confluence_domain_indices = [
#     'py-modindex',
# ]