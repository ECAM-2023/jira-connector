test
====

.. raw:: html

    <div class="document">

.. py:function:: get_content()

    Reads example.json file and extracts selected content

    :returns: content
    :rtype: dict

.. raw:: html

    </div>

.. code-block:: html

    {% set data = example_module.get_content() %}
    <h1>{{ data['title'] }}</h1>
    {{ data['content'] }}