.. include:: ../_static/references/_sphinx.rst

PLANTUML
--------

Graph 1
^^^^^^^

.. uml::

    @startuml
    user -> (use PlantUML)
    note left of user
        Hello!   
    end note
    user1 -> (use user)
    note right of user1
        Hello!   
    end note   
    @enduml

.. raw:: latex

    \newpage

Graph 2
^^^^^^^

.. uml::

    @startuml
    actor "Main Database" as DB << Application >>
    
    note left of DB
        This actor 
        has a "name with spaces",
        an alias
        and a stereotype 
    end note
    
    actor User << Human >>
    actor SpecialisedUser
    actor Administrator
    
    User <|--- SpecialisedUser
    User <|--- Administrator
    
    usecase (Use the application) as (Use) << Main >>
    usecase (Configure the application) as (Config)
    Use ..> Config : <<includes>>
    
    User --> Use
    DB --> Use
    
    Administrator --> Config 
    
    note "This note applies to\nboth actors." as MyNote
    MyNote .. Administrator
    MyNote .. SpecialisedUser
    
    '  this is a text comment and won't be displayed
    AnotherActor ---> (AnotherUseCase)
    
    '  to increase the length of the edges, just add extras dashes, like this:
    ThirdActor ----> (LowerCase)
    
    '  The direction of the edge can also be reversed, like this:
    (UpperCase) <---- FourthActor
    
    @enduml

.. raw:: latex

    \newpage

Graph 3 : wireframe
^^^^^^^^^^^^^^^^^^^

.. uml::

    @startuml
    salt
    {
        Just plain text
        [This is my button]
        ()  Unchecked radio
        (X) Checked radio
        []  Unchecked box
        [X] Checked box
        "Enter text here   "
        ^This is a droplist^
    }
    @enduml

.. raw:: latex

    \newpage

Graph 4: clock
^^^^^^^^^^^^^^

.. uml::

    @startuml

    Organization <|-- Customer

    Organization : organizationID: string
    Organization : Name: string
    interface       Organization
    Customer : organization: Organization[]
    Customer : displayName: string
    Customer : accountID: string
    interface       Customer
    
    @enduml

.. raw:: latex

    \newpage
